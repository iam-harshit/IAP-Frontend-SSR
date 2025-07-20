// hooks/useGraphData.js
import { useEffect, useState } from 'react'
import { fullMonthToAbbr, monthsArray, numericMonthToAbbr } from '../../../Constants/Dashboard-Constants/HomeSectionData/GraphData'
import { handleMenteesperMonth, handleSessionsperMonth } from '../PaymentOperation/PaymentApi'


export const useGraphData = (isMentor) => {
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const defaultMonthlyData = monthsArray?.map((month) => ({ month, value: 0 }))

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                let fetchedData = []
                if (isMentor) {
                    const res = await handleMenteesperMonth()
                    fetchedData = res?.data?.data || []
                } else {
                    const res = await handleSessionsperMonth()
                    fetchedData = res?.data?.data || []
                }

                const mappedData = [...defaultMonthlyData]
                fetchedData.forEach((item) => {
                    let monthAbbr = typeof item.month === 'number'
                        ? numericMonthToAbbr[item.month]
                        : fullMonthToAbbr[item.month] || item.month

                    const index = mappedData.findIndex((m) => m.month === monthAbbr)
                    if (index !== -1) {
                        mappedData[index].value = isMentor
                            ? item.mentees || 0
                            : item.totalSessions || 0
                    }
                })

                setUserData(mappedData)
            } catch (error) {
                setUserData(defaultMonthlyData)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [isMentor])

    return { userData, isLoading }
}

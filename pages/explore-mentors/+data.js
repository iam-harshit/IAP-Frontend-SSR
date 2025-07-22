// 1. Import your actual API function
import { handleMentors } from '@/services/Operations/MentorsOperation/MentorsApi';

export async function data(pageContext) {
  try {
    // 2. Fetch the raw data directly from your API service
    const page = pageContext.urlParsed.search?.page || 1;
    const responseData = await handleMentors(page);

    // 3. Return the data as `pageProps`. Vike will pass this to your page component.
    return {
      pageProps: {
        // The data structure from your API: { mentors: [], metadata: {} }
        initialMentors: responseData.mentors || [],
        initialMetadata: responseData.metadata || {},
      },
    };
  } catch (error) {
    console.error('Error fetching mentors data:', error);
    // Return an empty state on error
    return {
      pageProps: {
        initialMentors: [],
        initialMetadata: {},
      },
    };
  }
}

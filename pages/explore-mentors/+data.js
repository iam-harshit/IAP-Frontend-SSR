import { handleMentors } from '@/services/Operations/MentorsOperation/MentorsApi';

export async function data(pageContext) {
  try {
    // Extract the page number from the URL, e.g., /explore-mentors?page=2
    const page = pageContext.urlParsed.search?.page || 1;

    // Fetch the raw data directly from your API service.
    const responseData = await handleMentors(page);

    // Construct the initial state object to match your Redux slice structure.
    const initialState = {
      mentors: {
        list: responseData.mentors || [],
        metadata: responseData.metadata || {},
        loading: false,
        error: null,
      },
    };

    return { initialState };
  } catch (error) {
    console.error('Error fetching mentors data:', error);
    // Return an empty but correctly structured state on error
    return {
      initialState: {
        mentors: {
          list: [],
          metadata: {},
          loading: false,
          error: 'Failed to load mentors.',
        },
      },
    };
  }
}

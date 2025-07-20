import { apiConnector } from '../../ApiConnector';
import { blogEndPoints } from '../../BackendApis';


// CREATE BLOG
export const handleCreateBlogs = async (payload) => {
    console.log("payload", payload)
    try {
        const response = await apiConnector('POST', blogEndPoints.CREATE_BLOGS, payload,
            { 'Content-Type': 'application/json' }, null, true);
        return response?.data;
    } catch (error) {
        return error;
    }
};

// GET ALL BLOGS
export const handleAllBlogs = async () => {
    try {
        const response = await apiConnector('GET', blogEndPoints.GET_ALL_BLOGS, null,
            { 'Content-Type': 'application/json' }, null, true);
        return response?.data;
    } catch (error) {
        return error;
    }
};

// LIKED BLOG
export const handleLikeBlog = async (blogId) => {
    try {
        const response = await apiConnector('POST', `${blogEndPoints.LIKE_BLOG}/${blogId}/like`, null, { 'Content-Type': 'application/json' }, null, true);

        // Ensure consistent response structure
        if (response.data) {
            return {
                statusCode: 200,
                data: response.data,
                message: response.message || 'Like action successful'
            };
        }
        return response;
    } catch (error) {
        return {
            statusCode: error.response?.status || 500,
            message: error.response?.data?.message || 'Failed to like blog',
            error: error
        };
    }
};

// COMMENT BLOG
export const handleCommentBlog = async (blogId, commentData) => {
    try {
        const response = await apiConnector(
            'POST',
            `${blogEndPoints.COMMENT_BLOG}/${blogId}/comment`,
            commentData,
            { 'Content-Type': 'application/json' },
            null,
            true
        );

        if (response.data) {
            return {
                statusCode: 200,
                data: response.data,
                message: response.message || 'Comment posted successfully'
            };
        }
        return response;
    } catch (error) {
        return {
            statusCode: error.response?.status || 500,
            message: error.response?.data?.message || 'Failed to post comment',
            error: error
        };
    }
};
// GET BLOG BY USER ID
export const handleBlogByUserId = async (userId) => {
    try {
        const response = await apiConnector('GET', blogEndPoints.GET_BLOGS_BY_USERID, null,
            { 'Content-Type': 'application/json' }, { userId }, true);
        return response?.data;
    } catch (error) {
        return error;
    }
};

// GET BY BLOG ID
export const handleGetBlogById = async (id) => {
    try {
        // Validate the ID format first
        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
            throw new Error('Invalid blog ID format');
        }

        const response = await apiConnector(
            'GET',
            `${blogEndPoints.GET_BLOG_BY_ID}/${id}`,
            null,
            { 'Content-Type': 'application/json' },
            null,
            true
        );

        if (!response.data) {
            throw new Error('Blog not found');
        }

        return {
            statusCode: 200,
            data: response.data,
            message: 'Blog fetched successfully'
        };
    } catch (error) {
        return {
            statusCode: error.response?.status || 400,
            message: error.message || 'Failed to fetch blog',
            error: error
        };
    }
};

// UPDATE BY BLOG ID
export const handleUpdateBlogById = async (id , data) => {
    try {
        const response = await apiConnector('PUT', `${blogEndPoints.UPDATE_BLOG_BY_ID}/${id}`, data,
            { 'Content-Type': 'application/json' }, null, true);
        return response?.data;
    } catch (error) {
        return error;
    }
};


// DELETE BY BLOG ID
export const handleDeleteBlogById = async (id) => {
    try {
        const response = await apiConnector('DELETE', `${blogEndPoints.DELETE_BLOG_BY_ID}/${id}`, null, { 'Content-Type': 'application/json' }, null, true);
        return response?.data;
    } catch (error) {
        return error;
    }
};

// newly added for featured blogs
export const getFeaturedBlog = async () => {
    try {
        const response = await apiConnector('GET', blogEndPoints.GET_FEATURED_BLOG, null, { 'Content-Type': 'application/json' }, null, true);
        return response?.data?.data;
    } catch (error) {
        return error;
    }
};




const getImageFile = async (imageUrl, fileName) => {
    try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();

        if (response.headers.get('Content-Type') == "image/png"
            || response.headers.get('Content-Type') == "image/jpg"
            || response.headers.get('Content-Type') == "image/jpeg") {
            return new File([blob], fileName, { type: response.headers.get('Content-Type') });
        }
        else {
            throw ("Incorrect file format")
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error; // Propagate the error to the caller
    }
};

export default getImageFile;
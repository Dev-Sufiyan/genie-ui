const baseURL = 'https://genie-counter-webapi-ajeve6bphcgrcycm.centralindia-01.azurewebsites.net/api/Count';

export const getCount = async (): Promise<number> => {
    try {
      const response = await fetch(baseURL);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      const text = await response.text(); // Get raw response text
      console.log('Response text:', text);
      const data = JSON.parse(text); // Parse response text to JSON
      console.log('Parsed data:', data);
      if (typeof data.totalCount === 'number') {
        return data.totalCount;
      } else {
        throw new Error('totalCount is not a number or is missing');
      }
    } catch (error) {
      console.error('Error fetching count:', error);
      throw error;
    }
};

  export const addCount = async (num: number) => {
    try {
      const response = await fetch(`${baseURL}/add?num=${num}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to add count');
      }
      // Optionally handle the response if needed
      const data = await response.json();
      console.log('Add count response:', data);
    } catch (error) {
      console.error('Error adding count:', error);
    }
  };
  
  

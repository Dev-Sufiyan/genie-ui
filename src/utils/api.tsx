const baseURL = 'https://counter-2-hvchewf2hzbjfeev.southindia-01.azurewebsites.net/api/Count';

export const getCount = async (): Promise<number> => {
    try {
      const response = await fetch(baseURL);
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.totalCount as number; // Ensure the return type is a number
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
  
  

// Mock API service
export const menuApi = {
  saveChanges: async (categories: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success/failure (90% success rate)
    if (Math.random() > 0.1) {
      return { success: true, data: categories };
    } else {
      throw new Error('Failed to save changes');
    }
  }
};
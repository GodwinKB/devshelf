export const getErrorMessage = (err) => {
  // Check if the error came from the C# backend response
  if (err.response && err.response.data) {
    const serverData = err.response.data;

    // Pattern 1: ASP.NET Core validation errors (e.g., { Title: ["Title is required"] })
    if (serverData.errors && typeof serverData.errors === 'object') {
      return Object.values(serverData.errors).flat().join(' ');
    } 
    
    // Pattern 2: Identity array errors
    if (Array.isArray(serverData) && serverData[0]?.description) {
      return serverData.map(e => e.description).join(' ');
    } 
    
    // Pattern 3: Standard custom errors { error: "Invalid credentials" }
    if (serverData.error) return serverData.error;
    if (serverData.message) return serverData.message;

    return 'An unexpected server error occurred.';
  }
  
  // Fallback if the backend is completely offline
  return 'Network error. Is the server running?';
};
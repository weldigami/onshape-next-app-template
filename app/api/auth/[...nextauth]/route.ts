// Import authentication handlers from the auth configuration file
import { handlers } from "../../../lib/auth"; 

// Export the GET and POST handlers to handle authentication requests
export const { GET, POST } = handlers;
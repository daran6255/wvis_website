// ---------------------------------------
// User Interface (from backend structure)
// ---------------------------------------
export interface User {
    id: string;
    email: string;
}

// ---------------------------------------
// Signup / Login
// ---------------------------------------
export interface SignupData {
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: string;
    token: string;
    result: {
        id: string;
        email: string;
    };
}

export interface SignupResponse {
    status: string;
    result?: {
        id: string;
        email: string;
    };
    message?: string;
}

export interface LogoutResponse {
    msg: string;
}

export interface VerifyTokenResponse {
    status: string;
    message: string;
    result: {
        id: string;
        email: string;
    } | null;
}

// ---------------------------------------
// Newsletter Interfaces
// ---------------------------------------

export interface Newsletter {
    title: string;
    image: string;      // URL from backend: /static/images/...
    link: string;       // URL from backend: /static/pdfs/...
    description: string;
  }
  
  // FormData format when sending POST request with files
  export interface NewsletterPostData {
    title: string;
    description: string;
    image?: File; // image file (optional during edit)
    pdf?: File;   // pdf file (optional during edit)
  }
  
  // Response from GET /api/newsletters/getall
  export type NewsletterListResponse = Newsletter[];
  
  // Response from POST /api/newsletters/postnewsletter
  export interface NewsletterPostResponse {
    message: string;
  }
  
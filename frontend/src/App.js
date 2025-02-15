import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignInButton, SignUpButton } from "@clerk/clerk-react";
import Dashboard from "../src/pages/dashboard/Dashboard";
import { FinancialRecordsProvider } from "./contexts/financial-record";
import SignInPage from "./pages/auth/SignInPage";

const clerkFrontendApi = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY; 

function App() {
  return (
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <Router>
        <div className="app-container">
          <FinancialRecordsProvider>
            <SignedIn>
              <Dashboard/>
            </SignedIn>
              {/* Redirect to Sign-In if signed out */}
              <SignedOut>
                <SignInPage/>
              </SignedOut>
          </FinancialRecordsProvider>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;

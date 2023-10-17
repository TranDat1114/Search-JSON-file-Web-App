
import { ThemeProvider } from "./@/components/theme/theme-provider"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/home";
import { OrganizationTicketPage } from "./pages/organization-ticket";
import { OrganizationUserPage } from "./pages/organization-user";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <div className="App">
            <Routes>
              <Route path='/' element={< HomePage />}></Route>
              <Route path='/organization-ticket/:organizationId?' element={<OrganizationTicketPage />}></Route>
              <Route path='/organization-user/:organizationId?' element={<OrganizationUserPage />}></Route>
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App

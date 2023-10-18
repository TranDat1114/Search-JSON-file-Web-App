
import { ThemeProvider } from "./@/components/theme/theme-provider"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/home";
import { TicketPage } from "./pages/ticket";
import { UserPage } from "./pages/user";
import { OrganizationPage } from "./pages/organization";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <div className="App">
            <Routes>
              <Route path='/' element={< HomePage />}></Route>
              <Route path='/ticket-assignee/:assigneeId?' element={<TicketPage />}></Route>
              <Route path='/ticket-organization/:organizationId?' element={<TicketPage />}></Route>
              <Route path='/ticket-submited/:submitedId?' element={<TicketPage />}></Route>
              <Route path='/ticket/:ticketId?' element={<TicketPage />}></Route>

              <Route path='/user-organization/:organizationId?' element={<UserPage />}></Route>
              <Route path='/user/:userId?' element={<UserPage />}></Route>

              <Route path='/organization/:organizationId?' element={<OrganizationPage />}></Route>
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App

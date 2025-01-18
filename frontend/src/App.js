import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { BASE_URL } from './context/globalContext';
function App() {
  const [active, setActive] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
      setIsAuthenticated(true);
      // Fetch the user info (including userName) from the backend
      axios.get(`${BASE_URL}auth/user`)
        .then(response => {
          console.log("data in response is ",response.data);
          setUserName(response.data.user.name); // Assuming response has user object with 'name'
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, []);

  const orbMemo = useMemo(() => <Orb />, []);

  const handleAuthentication = () => {
    axios.get(`${BASE_URL}auth/user`)
        .then(response => {
          console.log("data in response is ",response.data);
          setUserName(response.data.user.name); // Assuming response has user object with 'name'
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      // Send logout request to the server
      const response = await axios.post(`${BASE_URL}auth/logout`, null, {
        withCredentials: true, // To include cookies in the request
      });

      if (response.data.success) {
        // Clear token and reset authentication state
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        setActive(1); // Reset navigation to default page
        console.log(response.data.message); // Optional: display success message
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error.response?.data || error.message);
    }
  };

  return (
    <AppStyled bg={bg} className="App">
      {!isAuthenticated ? (
        <AuthContainer>
          {showLogin ? (
            <Login onAuthenticate={handleAuthentication} togglePage={() => setShowLogin(false)} />
          ) : (
            <Register onAuthenticate={handleAuthentication} togglePage={() => setShowLogin(true)} />
          )}
        </AuthContainer>
      ) : (
        <>
          {orbMemo}
          <MainLayout>
            <Navigation active={active} setActive={setActive} onLogout={handleLogout} userName={userName} />
            <main>
              {active === 1 ? <Dashboard /> : active === 3 ? <Income /> : <Expenses />}
            </main>
          </MainLayout>
        </>
      )}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;

// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import styled from "styled-components";
// import bg from './img/bg.png';
// import { MainLayout } from './styles/Layouts';
// import Orb from './Components/Orb/Orb';
// import Navigation from './Components/Navigation/Navigation';
// import Dashboard from './Components/Dashboard/Dashboard';
// import Income from './Components/Income/Income';
// import Expenses from './Components/Expenses/Expenses';
// import Login from './Components/Auth/Login';
// import Register from './Components/Auth/Register';

// function App() {
//   const [active, setActive] = useState(1);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showLogin, setShowLogin] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const orbMemo = useMemo(() => <Orb />, []);

//   const handleAuthentication = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <AppStyled bg={bg} className="App">
//       {!isAuthenticated ? (
//         <AuthContainer>
//           {showLogin ? (
//             <Login onAuthenticate={handleAuthentication} togglePage={() => setShowLogin(false)} />
//           ) : (
//             <Register onAuthenticate={handleAuthentication} togglePage={() => setShowLogin(true)} />
//           )}
//         </AuthContainer>
//       ) : (
//         <>
//           {orbMemo}
//           <MainLayout>
//             <Navigation active={active} setActive={setActive} />
//             <main>
//               {active === 1 ? <Dashboard /> : active === 3 ? <Income /> : <Expenses />}
//             </main>
//           </MainLayout>
//         </>
//       )}
//     </AppStyled>
//   );
// }

// const AppStyled = styled.div`
//   height: 100vh;
//   background-image: url(${props => props.bg});
//   position: relative;

//   main {
//     flex: 1;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     overflow-x: hidden;
//     &::-webkit-scrollbar {
//       width: 0;
//     }
//   }
// `;

// const AuthContainer = styled.div`
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// export default App;


// import React, {useState, useMemo} from 'react'
// import styled from "styled-components";
// import bg from './img/bg.png'
// import {MainLayout} from './styles/Layouts'
// import Orb from './Components/Orb/Orb'
// import Navigation from './Components/Navigation/Navigation'
// import Dashboard from './Components/Dashboard/Dashboard';
// import Income from './Components/Income/Income'
// import Expenses from './Components/Expenses/Expenses';
// import { useGlobalContext } from './context/globalContext';

// function App() {
//   const [active, setActive] = useState(1)

//   const global = useGlobalContext()
//   console.log(global);

//   const displayData = () => {
//     switch(active){
//       case 1:
//         return <Dashboard />
//       case 2:
//         return <Dashboard />
//       case 3:
//         return <Income />
//       case 4: 
//         return <Expenses />
//       default: 
//         return <Dashboard />
//     }
//   }

//   const orbMemo = useMemo(() => {
//     return <Orb />
//   },[])

//   return (
//     <AppStyled bg={bg} className="App">
//       {orbMemo}
//       <MainLayout>
//         <Navigation active={active} setActive={setActive} />
//         <main>
//           {displayData()}
//         </main>
//       </MainLayout>
//     </AppStyled>
//   );
// }

// const AppStyled = styled.div`
//   height: 100vh;
//   background-image: url(${props => props.bg});
//   position: relative;
//   main{
//     flex: 1;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     overflow-x: hidden;
//     &::-webkit-scrollbar{
//       width: 0;
//     }
//   }
// `;

// export default App;

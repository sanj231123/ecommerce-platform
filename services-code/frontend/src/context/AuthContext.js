import {

  createContext,

  useEffect,

  useState

} from "react";

// ======================================
// CREATE CONTEXT
// ======================================

export const AuthContext =
  createContext();

// ======================================
// PROVIDER
// ======================================

export const AuthProvider =
  ({ children }) => {

    // ======================================
    // STATES
    // ======================================

    const [user, setUser] =
      useState(null);

    const [token, setToken] =
      useState(null);

    const [role, setRole] =
      useState(null);

    const [loading, setLoading] =
      useState(true);

    // ======================================
    // LOAD AUTH
    // ======================================

    useEffect(() => {

      try {

        const storedToken =
          localStorage.getItem(
            "token"
          );

        const storedRole =
          localStorage.getItem(
            "role"
          );

        const storedUser =
          localStorage.getItem(
            "user"
          );

        // RESTORE SESSION

        if (
          storedToken
        ) {

          setToken(
            storedToken
          );

          setRole(
            storedRole
          );

          // PARSE USER

          if (
            storedUser
          ) {

            try {

              setUser(
                JSON.parse(
                  storedUser
                )
              );

            } catch {

              setUser(
                storedUser
              );

            }

          }

        }

      } catch (err) {

        console.log(
          "Auth Restore Error:",
          err
        );

      } finally {

        setLoading(false);

      }

    }, []);

    // ======================================
    // LOGIN
    // ======================================

    const login = (
      authData
    ) => {

      // SAVE LOCAL STORAGE

      localStorage.setItem(

        "token",

        authData.token

      );

      localStorage.setItem(

        "role",

        authData.role

      );

      localStorage.setItem(

        "user",

        JSON.stringify(
          authData.user
        )

      );

      // UPDATE STATE

      setToken(
        authData.token
      );

      setRole(
        authData.role
      );

      setUser(
        authData.user
      );

    };

    // ======================================
    // LOGOUT
    // ======================================

    const logout = () => {

      // CLEAR STORAGE

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "role"
      );

      localStorage.removeItem(
        "user"
      );

      // CLEAR STATE

      setToken(null);

      setRole(null);

      setUser(null);

      // REDIRECT

      window.location.href =
        "/login";

    };

    // ======================================
    // HELPERS
    // ======================================

    const isAuthenticated =
      !!token;

    const isAdmin =
      role === "admin";

    // ======================================
    // PROVIDER
    // ======================================

    return (

      <AuthContext.Provider

        value={{

          user,

          token,

          role,

          loading,

          login,

          logout,

          setUser,

          isAuthenticated,

          isAdmin

        }}

      >

        {children}

      </AuthContext.Provider>

    );

  };

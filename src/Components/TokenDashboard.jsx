import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";
export default function TokenDashboard({ onReset }) {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    error,
    getAccessTokenSilently,
    getIdTokenClaims,
    user,
  } = useAuth0();
  const [tokens, setTokens] = useState({ access: null, id: null });
  const [tokenError, setTokenError] = useState(null);
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !error) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, error, loginWithRedirect]);
  useEffect(() => {
    const fetchTokens = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          const claims = await getIdTokenClaims();
          setTokens({
            access: accessToken,
            id: claims?.__raw,
          });
        } catch (err) {
          setTokenError(err.message);
        }
      }
    };
    fetchTokens();
  }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims]);
  if (error) {
    return (
      <div
        style={{
          backgroundColor: "black",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            width: "100%",
          }}
        >
          <h2 style={{ color: "#dc3545", textAlign: "center" }}>
            Connection Error
          </h2>
          <div
            style={{
              backgroundColor: "#ffe6e6",
              padding: "1rem",
              borderRadius: "4px",
              marginBottom: "1.5rem",
              fontFamily: "monospace",
              width: "100%",
              maxWidth: "600px",
              overflowX: "auto",
            }}
          >
            <strong>Error:</strong> {error.message}
          </div>
          <div
            style={{ color: "white", textAlign: "center", maxWidth: "400px" }}
          >
            You might have not configured the Application/API correctly.
            <br />
            Please Follow the{" "}
            <span
              style={{
                fontWeight: "800",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Documentation
            </span>
          </div>
          <button
            onClick={onReset}
            style={{
              padding: "1rem 2rem",
              cursor: "pointer",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              marginTop: "2rem",
            }}
          >
            Retry
          </button>
        </div>
        <Footer />
      </div>
    );
  }
  if (isLoading || !isAuthenticated) {
    return (
      <>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            fontSize: "20px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "5px solid rgba(255, 255, 255, 0.2)",
              borderTop: "5px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
      </>
    );
  }
  const decodeJWT = (token) => {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return { error: "Could not Decode Token (It might not be a JWT)" };
    }
  };
  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      {user && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2%",
            backgroundColor: "#1a1a1a",
            borderBottom: "1px solid #333",
            boxSizing: "border-box",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
              flexWrap: "wrap",
            }}
          >
            <img
              src={user.picture}
              alt="Profile"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                border: "2px solid white",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                marginLeft: "1rem",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "clamp(0.5rem, 3vw, 1.1rem)",
                  fontWeight: "bold",
                }}
              >
                {user.email}
              </span>
              <span
                style={{
                  color: "#aaa",
                  fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                  wordBreak: "break-all",
                }}
              >
                {user.nickname}
              </span>
            </div>
          </div>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            style={{
              padding: "0.5rem 1rem",
              cursor: "pointer",
              backgroundColor: "#dc3545",
              color: "white",
              border: "1px solid white",
              borderRadius: "4px",
              transition: "ease all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#dc3545";
              e.target.style.transform = "scale(1.0)";
            }}
          >
            Logout
          </button>
        </div>
      )}
      {tokenError && (
        <div
          style={{
            color: "red",
            marginBottom: "1rem",
            padding: "1rem",
            backgroundColor: "#ffe6e6",
            borderRadius: "4px",
            width: "90%",
            maxWidth: "900px",
            boxSizing: "border-box",
          }}
        >
          Error Fetching Tokens: {tokenError}
        </div>
      )}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          padding: "0 1rem",
          marginBottom: "3rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "white" }}>Access Token:</h3>
          <textarea
            readOnly
            value={tokens.access || "Fetching Access Token..."}
            rows="6"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: "2px solid white",
              borderRadius: "10px",
              color: "white",
              fontFamily: "monospace",
              padding: "0.75rem",
              boxSizing: "border-box",
              fontSize: "0.9rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "white" }}>Decoded Access Token:</h3>
          <pre
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: "2px solid white",
              borderRadius: "10px",
              color: "white",
              fontFamily: "monospace",
              padding: "0.75rem",
              boxSizing: "border-box",
              overflowX: "auto",
              fontSize: "0.9rem",
            }}
          >
            {tokens.access
              ? JSON.stringify(decodeJWT(tokens.access), null, 2)
              : "Decoding Access Token..."}
          </pre>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "white" }}>ID Token:</h3>
          <textarea
            readOnly
            value={tokens.id || "Fetching ID Token..."}
            rows="6"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: "2px solid white",
              borderRadius: "10px",
              color: "white",
              fontFamily: "monospace",
              padding: "0.75rem",
              boxSizing: "border-box",
              fontSize: "0.9rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "white" }}>Decoded ID Token:</h3>
          <pre
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: "2px solid white",
              borderRadius: "10px",
              color: "white",
              fontFamily: "monospace",
              padding: "0.75rem",
              boxSizing: "border-box",
              overflowX: "auto",
              fontSize: "0.9rem",
            }}
          >
            {tokens.id
              ? JSON.stringify(decodeJWT(tokens.id), null, 2)
              : "Decoding ID Token..."}
          </pre>
        </div>
      </div>
      <Footer />
    </div>
  );
}

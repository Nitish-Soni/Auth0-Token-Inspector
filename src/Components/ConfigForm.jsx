import Footer from "./Footer.jsx";
export default function ConfigForm({ handleConnect }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "1rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            maxWidth: "450px",
            border: "2px solid white",
            padding: "2rem 1.5rem",
            borderRadius: "15px",
            boxSizing: "border-box",
            background: "transparent",
          }}
        >
          <h2
            style={{
              margin: "0 0 1.5rem 0",
              width: "100%",
              textAlign: "center",
              fontWeight: "800",
              color: "white",
              fontSize: "clamp(1.2rem, 5vw, 1.5rem)",
            }}
          >
            Auth0 Configuration
          </h2>
          <form
            onSubmit={handleConnect}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <label style={{ color: "white", marginBottom: "0.5rem" }}>
                Auth0 Domain:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                name="domain"
                type="text"
                required
                placeholder="tenant.region.auth0.com"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "2px solid white",
                  borderRadius: "5px",
                  padding: "0.75rem",
                  color: "white",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <label style={{ color: "white", marginBottom: "0.5rem" }}>
                Client ID:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                name="clientId"
                type="text"
                required
                placeholder="Your Application Client ID"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "2px solid white",
                  borderRadius: "5px",
                  padding: "0.75rem",
                  color: "white",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <label style={{ color: "white", marginBottom: "0.5rem" }}>
                Audience:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                name="audience"
                type="text"
                required
                placeholder="https://your-api-identifier"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "2px solid white",
                  borderRadius: "5px",
                  padding: "0.75rem",
                  color: "white",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <label style={{ color: "white", marginBottom: "0.5rem" }}>
                Organization ID:
              </label>
              <input
                name="organization"
                type="text"
                placeholder="org_xxxxxxxxxxxxxx"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "2px solid white",
                  borderRadius: "5px",
                  padding: "0.75rem",
                  color: "white",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                marginTop: "1rem",
                backgroundColor: "#dc3545",
                padding: "1rem",
                color: "white",
                border: "2px solid black",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Connect & Authenticate
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

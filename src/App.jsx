import { useState, useEffect } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import ConfigForm from "./components/ConfigForm";
import TokenDashboard from "./components/TokenDashboard";
import "./App.css";
export default function App() {
  const [authConfig, setAuthConfig] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const domain = params.get("d");
    const clientId = params.get("c");
    const audience = params.get("a");
    if (domain && clientId && audience) {
      setAuthConfig({ domain, clientId, audience });
    }
  }, []);
  const handleConnect = (event) => {
    event.preventDefault();
    const domain = event.target.domain.value.trim();
    const clientId = event.target.clientId.value.trim();
    const audience = event.target.audience.value.trim();
    const newUrl = `${window.location.origin}${window.location.pathname}?d=${encodeURIComponent(domain)}&c=${encodeURIComponent(clientId)}&a=${encodeURIComponent(audience)}`;
    window.history.replaceState({}, "", newUrl);
    setAuthConfig({ domain, clientId, audience });
  };
  const handleReset = () => {
    setAuthConfig(null);
    window.location.href = window.location.origin;
  };
  if (!authConfig) {
    return <ConfigForm handleConnect={handleConnect} />;
  }
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}${window.location.pathname}?d=${authConfig.domain}&c=${authConfig.clientId}&a=${authConfig.audience}`,
        audience: authConfig.audience,
        scope: "openid profile email",
      }}
    >
      <TokenDashboard onReset={handleReset} />
    </Auth0Provider>
  );
}

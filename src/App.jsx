import { useState, useEffect } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import ConfigForm from "./Components/ConfigForm.jsx";
import TokenDashboard from "./Components/TokenDashboard.jsx";
import "./App.css";
export default function App() {
  const [authConfig, setAuthConfig] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const domain = params.get("d");
    const clientId = params.get("c");
    const audience = params.get("a");
    const organization = params.get("o");
    if (domain && clientId && audience) {
      setAuthConfig({ domain, clientId, audience, organization });
    }
  }, []);
  const handleConnect = (event) => {
    event.preventDefault();
    const domain = event.target.domain.value.trim();
    const clientId = event.target.clientId.value.trim();
    const audience = event.target.audience.value.trim();
    const organization = event.target.organization.value.trim();
    let newUrl = `${window.location.origin}${window.location.pathname}?d=${encodeURIComponent(domain)}&c=${encodeURIComponent(clientId)}&a=${encodeURIComponent(audience)}`;
    if (organization) {
      newUrl += `&o=${encodeURIComponent(organization)}`;
    }
    window.history.replaceState({}, "", newUrl);
    setAuthConfig({ domain, clientId, audience, organization });
  };
  const handleReset = () => {
    setAuthConfig(null);
    window.location.href = window.location.origin;
  };
  if (!authConfig) {
    return <ConfigForm handleConnect={handleConnect} />;
  }
  const baseRedirectUri = `${window.location.origin}${window.location.pathname}?d=${authConfig.domain}&c=${authConfig.clientId}&a=${authConfig.audience}`;
  const authParams = {
    redirect_uri: authConfig.organization
      ? `${baseRedirectUri}&o=${encodeURIComponent(authConfig.organization)}`
      : baseRedirectUri,
    audience: authConfig.audience,
    scope: "openid profile email",
  };
  if (authConfig.organization) {
    authParams.organization = authConfig.organization;
  }
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={authParams}
    >
      <TokenDashboard onReset={handleReset} />
    </Auth0Provider>
  );
}

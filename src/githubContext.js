import { createContext, useContext } from "react";
import { useState } from "react";
const GihubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [avtar, setAvtar] = useState(" ");
  const [userName, setUserName] = useState(" ");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [repos, setrepos] = useState(0);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState("");
  return (
    <GihubContext.Provider
      value={{
        avtar,
        setAvtar,
        userName,
        setUserName,
        followers,
        setFollowers,
        following,
        setFollowing,
        repos,
        setrepos,
        bio,
        setBio,
        location,
        setLocation,
        url,
        setUrl
      }}
    >
      {children}
    </GihubContext.Provider>
  );
};

export const useGithubHook = () => {
  return useContext(GihubContext);
};

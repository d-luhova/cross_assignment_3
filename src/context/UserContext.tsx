import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";

export type UserProfile = {
  name: string;
  phone: string;
};

type UserContextType = {
  user: UserProfile;
  updateUser: (profile: UserProfile) => void;
};

const initialUser: UserProfile = {
  name: "",
  phone: "",
};

const USER_PROFILE_STORAGE_KEY = "user-profile";
const USER_PROFILE_FILE = "user-profile.json";

async function readUserProfile() {
  if (Platform.OS === "web") {
    const savedProfile = globalThis.localStorage?.getItem(
      USER_PROFILE_STORAGE_KEY
    );

    return savedProfile ? JSON.parse(savedProfile) : null;
  }

  const { File, Paths } = await import("expo-file-system");
  const profileFile = new File(Paths.document, USER_PROFILE_FILE);

  if (!profileFile.exists) {
    return null;
  }

  return JSON.parse(await profileFile.text());
}

async function saveUserProfile(profile: UserProfile) {
  if (Platform.OS === "web") {
    globalThis.localStorage?.setItem(
      USER_PROFILE_STORAGE_KEY,
      JSON.stringify(profile)
    );
    return;
  }

  const { File, Paths } = await import("expo-file-system");
  const profileFile = new File(Paths.document, USER_PROFILE_FILE);

  if (!profileFile.exists) {
    profileFile.create();
  }

  profileFile.write(JSON.stringify(profile));
}

export const UserContext = createContext<UserContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<UserProfile>(initialUser);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedProfile = await readUserProfile();

        if (!savedProfile) {
          return;
        }

        setUser({
          name: typeof savedProfile.name === "string" ? savedProfile.name : "",
          phone:
            typeof savedProfile.phone === "string" ? savedProfile.phone : "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadUser();
  }, []);

  const updateUser = (profile: UserProfile) => {
    const nextProfile = {
      name: profile.name.trim(),
      phone: profile.phone.trim(),
    };

    setUser(nextProfile);

    saveUserProfile(nextProfile).catch((error) => console.log(error));
  };

  const value = useMemo(
    () => ({
      user,
      updateUser,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}

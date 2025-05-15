
import { BookOpen, PencilLine, Search, Folder, User } from "lucide-react";

export const navigationLinks = [
  {
    name: "Home",
    path: "/",
    icon: BookOpen,
  },
  {
    name: "My Notes",
    path: "/notes",
    icon: Folder,
  },
  {
    name: "Create Note",
    path: "/new-note",
    icon: PencilLine,
  },
  {
    name: "Explore",
    path: "/explore",
    icon: Search,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

export const adminLink = {
  name: "Admin",
  path: "/admin",
  icon: User,
};

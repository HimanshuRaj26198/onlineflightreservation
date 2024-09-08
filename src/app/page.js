import Image from "next/image";
import styles from "./page.module.css";
import HomePage from "./home/page";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./_components/firebase/config";

export default function Home() {
  return (
    <HomePage />
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import errorImage from "../../public/error.jpg";
import { Metadata } from "next";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export const metadata: Metadata = {
  title: "ERROR - KR-CODE",
  description: "Generated by create next app",
};

const error = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="flex h-screen flex-col bg-white dark:bg-gray-900">
      <Image
        src={errorImage}
        alt="error"
        className="h-80 w-full object-cover"
      />

      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-xl px-4 py-5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            حدث خطأ.
          </h1>

          <h2 className="mt-5 text-2xl font-bold text-[crimson]">
            الخطأ هو: {error.message}
          </h2>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            .حاول مرة اخري, او عود الي الصفحة الرئيسية للبدء من جديد
          </p>

          <div className="flex items-center justify-center gap-5">
            <button
              className="mt-5 inline-block rounded bg-blue-700 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
              onClick={reset}
            >
              إعادة المحاولة
            </button>

            <Link
              href="/"
              className="mt-6 inline-block rounded bg-green-600 px-5 py-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring"
            >
              العودة الي الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default error;
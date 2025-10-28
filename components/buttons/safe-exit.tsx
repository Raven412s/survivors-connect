"use client"

export default function Footer() {

  const handleSafeExit = () => {
    // Option 1: External redirect (recommended)
    window.location.href = "https://www.google.com";

    // Option 2: If you only want to route internally
    // router.push("/home");
  };

  return (
      <button
        onClick={handleSafeExit}
        className="text-red-500 hover:text-red-600 font-semibold"
      >
        Safe Exit
      </button>
  );
}

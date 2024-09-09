export const isTeacher = (userId?: string | null) => {
  return (
    userId === process.env.NEXT_PUBLIC_ADMIN_ID ||
    userId === "user_2ki7DyXsSCkij9Zk3PaSsQiuZ1q"
  );
};

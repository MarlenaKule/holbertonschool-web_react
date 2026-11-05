const App = () => {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(defaultUser);
  const [notifications, setNotifications] = useState(notificationsList);

  // handleDisplayDrawer, handleHideDrawer, logIn, logOut,
  // markNotificationAsRead: mbeten saktësisht siç i ke

  const contextValue = useMemo(() => ({ user, logOut }), [user, logOut]);

  return (
    <NewContext.Provider value={contextValue}>
      {/* ... */}
          <CourseList courses={coursesList} />
      {/* ... */}
    </NewContext.Provider>
  );
};
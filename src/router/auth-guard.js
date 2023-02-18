const isAuthenticateGuard = (to, from, next) => {
  return new Promise((resolve) => {
    const ramdom = Math.random() * 100;
    console.log("ramdom", ramdom);
    if (ramdom > 50) {
      console.log("acceso permitido - Guard ");
      next();
    } else {
      console.log(ramdom, "acceso denegado - Guard");
      next({ name: "-home" });
    }
  });
};

export default isAuthenticateGuard;

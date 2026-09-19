const ownerMiddleware = (req, res, next) => {
  if (req.user.role !== "OWNER") {
    return res.status(403).json({
      success: false,
      message: "Akses ditolak",
    });
  }

  next();
};

export default ownerMiddleware;
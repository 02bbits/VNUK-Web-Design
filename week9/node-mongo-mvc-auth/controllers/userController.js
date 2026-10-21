const User = require('../models/User');


exports.registerForm = (req, res) =>
  res.render('users/register', { title: 'Đăng ký' });

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.create({ username, password });
    res.redirect('/users/login');
  }catch (err) {
    res.status(400).send('Lỗi đăng ký: ' + err.message);
  }
};

exports.loginForm = (req, res) =>
  res.render('users/login', { title: 'Đăng nhập' });

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.send('Sai tài khoản hoặc mật khẩu');

    const match = await user.comparePassword(password);
    if (!match) return res.send('Sai tài khoản hoặc mật khẩu');

    req.session.user = { id: user._id, username: user.username };
    res.redirect('/products');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/users/login'));
};

// Chỉ admin mới có quyền xem danh sách user


exports.index = async (req, res) => {
  const users = await User.find();
  res.render('users/index', {
    title: 'Quản lý User',
    users,
    user: req.session.user // user đang login
  });
};

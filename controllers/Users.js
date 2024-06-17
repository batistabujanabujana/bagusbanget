// import Users from "../model/usermodel.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export const getUsers = async (req, res) => {
//   try {
//     const loggedInUsername = req.user.username; // Mendapatkan username pengguna yang sedang login dari token
//     const loggedInUser = await Users.findOne({
//       where: { username: loggedInUsername },
//       attributes: ["name", "username", "usia", "gender", "tinggibadan", "beratbadan", "aktivitas"],
//     });

//     if (loggedInUser) {
//       res.json(loggedInUser); // Mengirimkan data pengguna yang ditemukan sebagai respons JSON
//     } else {
//       res.status(404).json({ message: "User not found" }); // Mengirimkan respons 404 jika pengguna tidak ditemukan
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "An error occurred" }); // Mengirimkan respons 500 jika terjadi kesalahan
//   }
// };

// // Fungsi untuk mendaftarkan pengguna baru
// // Fungsi untuk mendaftarkan pengguna baru
// export const Register = async (req, res) => {
//   const { name, username, password, usia, gender, tinggibadan, josin, beratbadan, aktivitas } = req.body;

//   try {
//     // Cek apakah username sudah ada
//     const existingUser = await Users.findOne({
//       where: { username },
//     });

//     if (existingUser) {
//       // Jika username sudah ada, kembalikan error dengan status 400
//       return res.status(400).json({
//         status: "Error",
//         message: `User with username "${username}" already exists!`,
//       });
//     }

//     // Enkripsi password
//     const salt = await bcrypt.genSalt();
//     const hashpassword = await bcrypt.hash(password, salt);

//     // Buat user baru
//     await Users.create({
//       name,
//       username,
//       password: hashpassword,
//       usia,
//       gender,
//       josin,
//       tinggibadan,
//       beratbadan,
//       aktivitas,
//     });

// Return response sebagai JSON
//     res.status(200).json({
//       status: "success",
//       message: "User registered successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "Error",
//       message: "Registration failed due to an internal error",
//     });
//   }
// };

// // Fungsi untuk login pengguna
// // Fungsi untuk login pengguna
// export const Login = async (req, res) => {
//   try {
//     // Mencari user berdasarkan username
//     const user = await Users.findOne({
//       where: {
//         username: req.body.username,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({
//         status: "Error",
//         message: `User with username "${req.body.username}" not found!`,
//       });
//     }

//     // Memeriksa apakah password sesuai
//     const match = await bcrypt.compare(req.body.password, user.password);
//     if (!match) {
//       return res.status(400).json({
//         status: "Failed",
//         message: "Wrong password!",
//       });
//     }

//     // Jika password cocok, buat token dan kirimkan respons
//     const userId = user.id;
//     const name = user.name;
//     const username = user.username;
//     const usia = user.usia;
//     const gender = user.gender;
//     const tinggibadan = user.tinggibadan;
//     const beratbadan = user.beratbadan;
//     const aktivitas = user.aktivitas;
//     const accessToken = jwt.sign({ userId, name, username, usia, gender, tinggibadan, beratbadan, aktivitas }, process.env.ACCESS_TOKEN_SECRET);
//     const refreshToken = jwt.sign({ userId, name, username, usia, gender, tinggibadan, beratbadan, aktivitas }, process.env.REFRESH_TOKEN_SECRET, {
//       expiresIn: "1d",
//     });

//     // Update refresh token di database
//     await Users.update(
//       { refresh_token: refreshToken },
//       {
//         where: {
//           id: userId,
//         },
//       }
//     );

//     // Mengatur cookie untuk refresh token
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
//       secure: true,
//     });

//     // Mengirimkan respons JSON
//     res.status(200).json({
//       status: "success",
//       message: "User login successfully",
//       user: {
//         name,
//         token: accessToken,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "Error",
//       message: "An internal error occurred during login",
//     });
//   }
// };

// // export const Login = async (req, res) => {
// //   try {
// //     const user = await Users.findAll({
// //       where: {
// //         username: req.body.username,
// //       },
// //     });
// //     const match = await bcrypt.compare(req.body.password, user[0].password);
// //     if (!match)
// //       return res.status(400).json({
// //         status: "Failed",
// //         message: "Wrong password!",
// //       });
// //     const userId = user[0].id;
// //     const name = user[0].name;
// //     const username = user[0].username;
// //     const usia = user[0].usia;
// //     const gender = user[0].gender;
// //     const tinggibadan = user[0].tinggibadan;
// //     const beratbadan = user[0].beratbadan;
// //     const aktivitas = user[0].aktivitas;
// //     const accessToken = jwt.sign({ userId, name, username, usia, gender, tinggibadan, beratbadan, aktivitas }, process.env.ACCESS_TOKEN_SECRET);
// //     const refreshToken = jwt.sign({ userId, name, username, usia, gender, tinggibadan, beratbadan, aktivitas }, process.env.REFRESH_TOKEN_SECRET, {
// //       expiresIn: "1d",
// //     });
// //     await Users.update(
// //       { refresh_token: refreshToken },
// //       {
// //         where: {
// //           id: userId,
// //         },
// //       }
// //     );

// //     res.cookie("refreshToken", refreshToken, {
// //       httpOnly: true,
// //       maxAge: 24 * 60 * 60 * 100,
// //       secure: true,
// //     });
// //     res.status(200).json({
// //       status: "success",
// //       message: "User login successfully",
// //       users: {
// //         name,
// //         token: accessToken,
// //       },
// //     });
// //     // res.json({
// //     //   accessToken,
// //     //  });
// //     // res.json({
// //     //   accessToken,
// //     //   user: {
// //     //     id: userId,
// //     //     name,
// //     //     username,
// //     //     usia,
// //     //     gender,
// //     //     tinggibadan,
// //     //     beratbadan,
// //     //   },
// //     // });
// //   } catch (error) {
// //     res.status(404).json({
// //       status: "Failed",
// //       message: "Wrong username or password!",
// //     });
// //   }
// // };

// // Endpoint untuk mengupdate profil pengguna
// // export const updateUser = async (req, res) => {
// //   const { tinggibadan, beratbadan, aktivitas } = req.body;
// //   const userId = req.user.userId;

// //   try {
// //     // Cari pengguna berdasarkan ID
// //     const user = await Users.findByPk(userId);

// //     if (!user) {
// //       return res.status(404).json({
// //         status: "Error",
// //         message: "User not found!",
// //       });
// //     }

// //     // Update data pengguna
// //     user.tinggibadan = tinggibadan || user.tinggibadan;
// //     user.beratbadan = beratbadan || user.beratbadan;
// //     user.aktivitas = aktivitas || user.aktivitas;

// //     await user.save();

// //     res.status(200).json({
// //       status: "Success",
// //       message: "Profile updated successfully!",
// //       user: {
// //         id: user.id,
// //         name: user.name,
// //         username: user.username,
// //         usia: user.usia,
// //         gender: user.gender,
// //         tinggibadan: user.tinggibadan,
// //         beratbadan: user.beratbadan,
// //         aktivitas: user.aktivitas,
// //       },
// //     });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({
// //       status: "Error",
// //       message: "An error occurred while updating profile",
// //     });
// //   }
// // };

// // export const updateUser = async (req, res) => {
// //   const { tinggibadan, beratbadan, aktivitas } = req.body;
// //   const { userId, username } = req.user;

// //   try {
// //     // Cari pengguna berdasarkan userId
// //     const user = await Users.findByPk(userId);

// //     if (!user) {
// //       return res.status(404).json({
// //         status: "Error",
// //         message: "User not found!",
// //       });
// //     }
// export const updateUser = async (req, res) => {
//   const { tinggibadan, beratbadan, usia, gender, aktivitas } = req.body;
//   const { userId } = req.user; // Mengambil userId dari token pengguna yang sedang login

//   try {
//     // Cari pengguna berdasarkan userId
//     const user = await Users.findByPk(userId);

//     // Jika pengguna tidak ditemukan
//     if (!user) {
//       return res.status(404).json({
//         status: "Error",
//         message: "User not found!",
//       });
//     }

//     // Update data pengguna dengan data baru jika tersedia
//     user.gender = gender || user.gender;
//     user.usia = usia || user.usia;
//     user.aktivitas = aktivitas || user.aktivitas;
//     user.tinggibadan = tinggibadan || user.tinggibadan;
//     user.beratbadan = beratbadan || user.beratbadan;
//     user.aktivitas = aktivitas || user.aktivitas;

//     // Simpan perubahan ke database
//     await user.save();

//     // Mengirimkan respons JSON
//     res.status(200).json({
//       status: "Success",
//       message: "Profile updated successfully!",
//       user: {
//         name: user.name,
//         username: user.username,
//         usia: user.usia,
//         gender: user.gender,
//         tinggibadan: user.tinggibadan,
//         beratbadan: user.beratbadan,
//         aktivitas: user.aktivitas,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Error",
//       message: "An error occurred while updating profile",
//     });
//   }
// };
// export const updateBerat = async (req, res) => {
//   const { berattujuan, tanggal } = req.body;
//   const { targetId } = req.user; // Mengambil userId dari token pengguna yang sedang login

//   try {
//     // Cari pengguna berdasarkan userId
//     const user = await Users.findByPk(userId);

//     // Jika pengguna tidak ditemukan
//     if (!user) {
//       return res.status(404).json({
//         status: "Error",
//         message: "User not found!",
//       });
//     }

//     // Update data pengguna dengan data baru jika tersedia
//     user.berattujuan = berattujuan || user.berattujuan;
//     user.tanggal = tanggal || user.tanggal;

//     // Simpan perubahan ke database
//     await user.save();

//     // Mengirimkan respons JSON
//     res.status(200).json({
//       status: "Success",
//       message: "Profile updated successfully!",
//       user: {
//         name: user.name,
//         username: user.username,
//         usia: user.usia,
//         gender: user.gender,
//         tinggibadan: user.tinggibadan,
//         beratbadan: user.beratbadan,
//         aktivitas: user.aktivitas,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Error",
//       message: "An error occurred while updating profile",
//     });
//   }
// };

// //     // Update data pengguna
// //     user.tinggibadan = tinggibadan || user.tinggibadan;
// //     user.beratbadan = beratbadan || user.beratbadan;
// //     user.aktivitas = aktivitas || user.aktivitas;

// //     await user.save();

// //     res.status(200).json({
// //       status: "Success",
// //       message: "Profile updated successfully!",
// //       user: {
// //         name: user.name,
// //         username: user.username,
// //         usia: user.usia,
// //         gender: user.gender,
// //         tinggibadan: user.tinggibadan,
// //         beratbadan: user.beratbadan,
// //         aktivitas: user.aktivitas,
// //       },
// //     });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({
// //       status: "Error",
// //       message: "An error occurred while updating profile",
// //     });
// //   }
// // };
import Users from "../model/usermodel.js";
import Target from "../model/target.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Endpoint untuk mendapatkan informasi pengguna
export const getUsers = async (req, res) => {
  try {
    const loggedInUsername = req.user.username;
    const loggedInUser = await Users.findOne({
      where: { username: loggedInUsername },
      attributes: ["name", "username", "usia", "gender", "tinggibadan", "beratbadan", "aktivitas"],
    });

    if (loggedInUser) {
      res.status(200).json({
        status: "Success",
        message: "User found successfully",
        user: loggedInUser,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// Fungsi untuk mendaftarkan pengguna baru
export const Register = async (req, res) => {
  const { name, username, password, usia, gender, tinggibadan, beratbadan, aktivitas } = req.body;

  try {
    // Cek apakah username sudah ada
    const existingUser = await Users.findOne({
      where: { username },
    });

    if (existingUser) {
      // Jika username sudah ada, kembalikan error dengan status 400
      return res.status(400).json({
        status: "Error",
        message: `User with username "${username}" already exists!`,
      });
    }

    // Enkripsi password
    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(password, salt);

    // Buat user baru
    await Users.create({
      name,
      username,
      password: hashpassword,
      usia,
      gender,
      tinggibadan,
      beratbadan,
      aktivitas,
    });

    // Return response sebagai JSON
    res.status(200).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Registration failed due to an internal error",
    });
  }
};

// Fungsi untuk login pengguna
export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: `User with username "${req.body.username}" not found!`,
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({
        status: "Failed",
        message: "Wrong password!",
      });
    }

    const userId = user.id;
    const name = user.name;
    const username = user.username;
    const usia = user.usia;
    const gender = user.gender;
    const tinggibadan = user.tinggibadan;
    const beratbadan = user.beratbadan;
    const aktivitas = user.aktivitas;
    const accessToken = jwt.sign({ userId, name, username, usia, gender, tinggibadan, beratbadan, aktivitas }, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign({ userId, name, username, usia, gender, tinggibadan, beratbadan, aktivitas }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      secure: true,
    });

    res.status(200).json({
      status: "success",
      message: "User login successfully",
      user: {
        name,
        token: accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "An internal error occurred during login",
    });
  }
};

// Fungsi untuk mengupdate profil pengguna
export const updateUser = async (req, res) => {
  const { tinggibadan, beratbadan, usia, gender, aktivitas } = req.body;
  const { userId } = req.user;

  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found!",
      });
    }

    user.gender = gender || user.gender;
    user.usia = usia || user.usia;
    user.aktivitas = aktivitas || user.aktivitas;
    user.tinggibadan = tinggibadan || user.tinggibadan;
    user.beratbadan = beratbadan || user.beratbadan;

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Profile updated successfully!",
      user: {
        name: user.name,
        username: user.username,
        usia: user.usia,
        gender: user.gender,
        tinggibadan: user.tinggibadan,
        beratbadan: user.beratbadan,
        aktivitas: user.aktivitas,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "An error occurred while updating profile",
    });
  }
};

// Fungsi untuk mengupdate target berat badan pengguna

// Pastikan path sesuai dengan struktur proyek Anda
// Pastikan path sesuai dengan struktur proyek Anda

// Assuming path to Target model

export const updateTarget = async (req, res) => {
  const { tujuanberatbadan, tanggal } = req.body;
  const { userId } = req.user;

  try {
    // Find the user and include their Target
    const user = await Users.findByPk(userId, {
      include: Target,
    });

    // Check if user or Target is not found
    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found!",
      });
    }

    // If user has no Target, create a new one
    let target = user.Target;
    if (!target) {
      target = await Target.create({
        tujuanberatbadan: tujuanberatbadan,
        tanggal: tanggal,
        userId: userId, // Associate with the user
      });
    } else {
      // Update Target attributes if new data is available
      target.tujuanberatbadan = tujuanberatbadan || target.tujuanberatbadan;
      target.tanggal = tanggal || target.tanggal;
      await target.save();
    }

    // Refresh user instance to include updated Target
    await user.reload({
      include: Target,
    });

    // Respond with success message and updated user information
    res.status(200).json({
      status: "Success",
      message: "Target updated successfully!",
      user: {
        name: user.name,
        username: user.username,
        usia: user.usia,
        gender: user.gender,
        tinggibadan: user.tinggibadan,
        beratbadan: user.beratbadan,
        aktivitas: user.aktivitas,
        tujuanberatbadan: target.tujuanberatbadan,
        tanggal: target.tanggal,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "An error occurred while updating target",
    });
  }
};

export const updateName = async (req, res) => {
  const { name } = req.body;
  const { userId } = req.user;

  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found!",
      });
    }

    user.name = name || user.name;

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Profile updated successfully!",
      user: {
        name: user.name,
        usia: user.usia,
        gender: user.gender,
        tinggibadan: user.tinggibadan,
        beratbadan: user.beratbadan,
        aktivitas: user.aktivitas,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "An error occurred while updating profile",
    });
  }
};

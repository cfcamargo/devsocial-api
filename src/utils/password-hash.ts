export const passwordHash = {
  async hashPassword(password: string) {
    const passwordHash = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 6,
    });

    return passwordHash;
  },

  async verifyPasswordHash(password: string, hash: string) {
    return await Bun.password.verify(password, hash);
  },
};

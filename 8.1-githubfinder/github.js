class Github {
  constructor() {
    this.client_id = 'dcbc4bba7774c5ac5b76';
    this.client_secret = 'a990ff5baa590bf236a59a2c7145f486702f73ca';
  }
  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
    const profile = await profileResponse.json();
    return {
      profile
    }
  }
}
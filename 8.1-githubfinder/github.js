class Github {
  constructor() {
    this.client_id = 'dcbc4bba7774c5ac5b76';
    this.client_secret = 'a990ff5baa590bf236a59a2c7145f486702f73ca';
    this.repos_count = 5;
    this.repos_sort = 'created: asc'
  }
  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}$client_id=${this.client_id}&client_secret=${this.client_secret}`);
    const profile = await profileResponse.json();
    const repos = await repoResponse.json();
    return { profile, repos }
  }
}
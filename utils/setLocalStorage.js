const setLocalStorage = data => {
    const profile = { profile: data };

    localStorage?.setItem('profile', JSON.stringify(profile));
}

export default setLocalStorage;
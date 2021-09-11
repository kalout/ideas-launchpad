const delLocalStorage = () => {
    localStorage.removeItem('profile');
    window.location.reload();
    history.pushState({}, null, '/auth');
}

export default delLocalStorage;
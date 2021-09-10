const delLocalStorage = () => {
    localStorage.removeItem('profile');
    window.location.reload();
}

export default delLocalStorage;
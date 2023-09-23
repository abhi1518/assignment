import axios from 'axios';

const API_BASE_URL = "http://localhost:8000/api/";

export const countrylist = async () => {
    try {
      const response = await fetch(API_BASE_URL + `country`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { status } = response;
      const data = await response.json();
      return data;
    } catch (error) {
      return (error);
    }
  };


  export const stateList = async (category_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}state/${category_id}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const { status } = response;
      const data = await response.json();
      return data;
    } catch (error) {
      return (error);
    }
  };

  export const cityList = async (category_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}city/${category_id}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      const { status } = response;
      const data = await response.json(); 
      return data;
    } catch (error) {
      return (error);
    }
  };

  export const alluser = async () => {
    try {
      const response = await fetch(API_BASE_URL + `all_user`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { status } = response;
      const data = await response.json();
      return data;
    } catch (error) {
      return (error);
    }
  };
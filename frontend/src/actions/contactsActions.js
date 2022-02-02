import axios from "axios";
import {
  CONTACT_CREATE_FAIL,
  CONTACT_CREATE_REQUEST,
  CONTACT_CREATE_SUCCESS,
  CONTACT_DELETE_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_UPDATE_FAIL,
  CONTACT_UPDATE_REQUEST,
  CONTACT_UPDATE_SUCCESS,
} from "../constants/contactsConstants";

export const listContacts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTACT_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/contacts`, config);

    dispatch({
      type: CONTACT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CONTACT_LIST_FAIL,
      payload: message,
    });
  }
};

export const createContactAction = (name, email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTACT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/contacts/addcontact`,
      { name, email },
      config
    );

    dispatch({
      type: CONTACT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CONTACT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateContactAction =
  (id, name, email) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CONTACT_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/contacts/${id}`,
        { name, email },
        config
      );

      dispatch({
        type: CONTACT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CONTACT_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteContactAction =
  (id, name, email) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CONTACT_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(`/api/contacts/${id}`, config);

      dispatch({
        type: CONTACT_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CONTACT_DELETE_FAIL,
        payload: message,
      });
    }
  };

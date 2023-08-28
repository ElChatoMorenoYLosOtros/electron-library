import useAdminStore from '@store/AdminStore';
import axios from 'axios';

const LibraryAPI = axios.create({
  baseURL: '/api'
});

const LibraryAPIService = () => {
  const { admin } = useAdminStore();

  const login = async ({
    email,
    password
  }: HandleLoginSubmitProps): Promise<AdminResponse> => {
    return LibraryAPI.post<AdminResponse>('/auth/login', {
      email,
      password
    })
      .then(resp => {
        return resp.data;
      })
      .catch((err: Error) => {
        return {
          message: 'Invalid Credentials',
          statusCode: 401,
          name: err.name
        };
      });
  };

  const getUsers = async (): Promise<GetUsersResponse> => {
    return LibraryAPI.get<GetUsersResponse>('/clients', {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getUserById = async ({
    id
  }: {
    id: string;
  }): Promise<GetUserByIdResponse> => {
    return LibraryAPI.get<GetUsersResponse>(`/clients/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data[0];
    });
  };

  const removeUserById = async ({
    id
  }: {
    id: string;
  }): Promise<RemoveUserByIdResponse> => {
    return LibraryAPI.delete<RemoveUserByIdResponse>(`/clients/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  return { login, getUsers, getUserById, removeUserById };
};

export default LibraryAPIService;

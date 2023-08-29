import { NavigateFunction } from 'react-router-dom';

export {};

declare global {
  interface TextFieldProps {
    title: string;
    name: string;
    placeholder: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time';
    className?: string;
    classNameTitle?: string;
  }

  interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    isSubmit?: boolean;
    disabled?: boolean;
  }

  interface AdminResponse {
    name?: string;
    email?: string;
    role?: string;
    accessToken?: string;
    statusCode?: number;
    message?: string;
  }

  interface HandleLoginSubmitProps {
    email: string;
    password: string;
  }

  interface Admin {
    name: string;
    email: string;
    role: string;
    accessToken: string;
  }

  interface AdminStore {
    admin: Admin;
    setName: ({ name }: { name: string }) => void;
    setEmail: ({ email }: { email: string }) => void;
    setRole: ({ role }: { role: string }) => void;
    setAccessToken: ({ accessToken }: { accessToken: string }) => void;
    setAdmin: ({ admin }: { admin: Admin }) => void;
    logout: () => void;
  }

  interface DeleteStore {
    type: string;
    onClick: () => void;
    setOnClick: ({ onClick }: { onClick: () => void }) => void;
    setType: ({ type }: { type: string }) => void;
  }

  interface LoginFormProps {
    setError: React.Dispatch<React.SetStateAction<string>>;
  }

  interface UseHandleLoginProps {
    setError: React.Dispatch<React.SetStateAction<string>>;
  }

  interface LoginFormTextFieldProps {
    title: string;
    name: string;
    placeholder: string;
    type: 'text' | 'password' | 'email' | 'number' | 'date' | 'time';
  }

  interface LoginSubmitButtonProps {
    children: React.ReactNode;
  }

  interface ItemListButtonProps {
    children: React.ReactNode;
    onClick: () => void;
  }

  interface SideBarItem {
    id: number;
    name: string;
    link: string;
  }

  interface SideBarMenu {
    menus: SideBarItem[];
  }

  interface SideBarItemListProps {
    name: string;
    link: string;
    navigate: NavigateFunction;
  }

  interface LogOutButtonProps {
    children: React.ReactNode;
  }

  interface LogOutButtonsProps {
    children: React.ReactNode;
    onClick: () => void;
    className: string;
  }

  interface UseLogOutProps {
    navigate: NavigateFunction;
  }

  interface MenuOptionButtonProps {
    src: string;
    title: string;
    navigate: NavigateFunction;
  }

  interface OptionMenu {
    id: number;
    url: string;
    title: string;
  }

  interface OptionsMenu {
    menu: OptionMenu[];
  }

  interface GlobalFormProps {
    title: string;
    children: React.ReactNode;
    subTitle: string;
  }

  interface GlobalTextFieldProps {
    title: string;
    name: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time';
  }

  interface GlobalSubmitButtonProps {
    children: React.ReactNode;
    className?: string;
  }

  type User = {
    clientId: number;
    name: string;
    lastName: string;
    address: string;
    email: string;
    phoneNumber: number;
    typeUser: string;
  };

  type GetUsersResponse = User[];

  type GetUserByIdResponse = User;

  type RemoveUserByIdResponse = User;

  type InfoPersonPageParams = {
    id: string;
  };

  interface CommonHeaderProps {
    title: string;
    subTitle?: string;
  }

  interface GlobalListProps {
    title: string;
    children: React.ReactNode;
  }

  interface DeleteButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className: string;
  }

  interface SelectFilterPersonProps {
    handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }

  interface OptionFilterPerson {
    value: string;
    children: React.ReactNode;
    isDisabled?: boolean;
  }

  interface LineProps {
    className?: string;
  }

  interface SearchInputPersonsProps {
    inputValue: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

  type Client = {
    name: string;
    lastName: string;
    address: string;
    email: string;
    phoneNumber: number;
    typeUser: string;
  };

  type CreateUserResponse = User;

  type UpdateUserByIdResponse = User;

  type NewDataPersonPageParams = {
    id: string;
  };

  interface GlobalTextProps {
    title: string;
    text: string;
  }

  interface InfoPersonProps {
    title: string;
    number: number;
    isDouble?: boolean;
  }

  type Material = {
    materialId: number;
    title: string;
    author: string;
    category: string;
    isbn: string;
    publicationYear: number;
    pageCount: number;
    quantity: number;
    available: boolean;
    type_material: string;
  };

  type MaterialWithOutID = {
    title: string;
    author: string;
    category: string;
    isbn: string;
    publicationYear: number;
    pageCount: number;
    quantity: number;
    available: boolean;
    type_material: string;
  };

  type GetMaterialsResponse = Material[];

  type GetMaterialByIdResponse = Material;

  type CreateMaterialResponse = Material;

  type RemoveMaterialByIdResponse = Material;

  type UpdateMaterialByIdResponse = Material;

  type NewDataMaterialPageParams = {
    id: string;
  };
}

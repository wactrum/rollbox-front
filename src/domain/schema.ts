/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/login": {
    /** @description Authorization in the system */
    post: operations["AuthController_login"];
  };
  "/refresh-token": {
    /** @description Token refresh */
    post: operations["AuthController_refreshToken"];
  };
  "/register": {
    /** @description Registration */
    post: operations["AuthController_register"];
  };
  "/password/reset/send": {
    /** @description Submit password reset verification code */
    post: operations["PasswordController_sendResetPasswordCode"];
  };
  "/password/reset/resend": {
    /** @description Resend verification code */
    post: operations["PasswordController_resendConfirmation"];
  };
  "/password/reset/confirm": {
    /** @description Confirm password change */
    post: operations["PasswordController_register"];
  };
  "/phone/confirm": {
    /** @description Confirm phone and end registration */
    post: operations["PhoneConfirmationController_confirm"];
  };
  "/phone/resend-confirmation": {
    /** @description Resend verification phone code */
    post: operations["PhoneConfirmationController_resendConfirmation"];
  };
  "/users": {
    get: operations["UsersController_findAll"];
    post: operations["UsersController_create"];
  };
  "/users/{id}": {
    get: operations["UsersController_findOne"];
    delete: operations["UsersController_remove"];
    patch: operations["UsersController_update"];
  };
  "/users/{id}/set-roles": {
    /** @description Установить роли пользователю */
    patch: operations["UsersController_setRoles"];
  };
  "/users/me": {
    get: operations["UsersController_me"];
  };
  "/roles": {
    get: operations["RolesController_findAll"];
    post: operations["RolesController_create"];
  };
  "/roles/{id}": {
    get: operations["RolesController_findOne"];
    delete: operations["RolesController_remove"];
    patch: operations["RolesController_update"];
  };
  "/roles/permissions": {
    /** @description Список доступов системы */
    get: operations["RolesController_getPermissions"];
  };
  "/delivery-locations": {
    get: operations["DeliveryLocationsController_findAll"];
    post: operations["DeliveryLocationsController_create"];
  };
  "/delivery-locations/my": {
    get: operations["DeliveryLocationsController_findMy"];
  };
  "/delivery-locations/{id}": {
    get: operations["DeliveryLocationsController_findOne"];
    delete: operations["DeliveryLocationsController_remove"];
    patch: operations["DeliveryLocationsController_update"];
  };
  "/categories": {
    get: operations["CategoriesController_findAll"];
    post: operations["CategoriesController_create"];
  };
  "/categories/products": {
    get: operations["CategoriesController_findAllWithProducts"];
  };
  "/categories/{id}": {
    get: operations["CategoriesController_findOne"];
    delete: operations["CategoriesController_remove"];
    patch: operations["CategoriesController_update"];
  };
  "/products": {
    get: operations["ProductsController_findAll"];
    post: operations["ProductsController_create"];
  };
  "/products/image/upload": {
    post: operations["ProductsController_uploadImage"];
  };
  "/products/{id}": {
    get: operations["ProductsController_findOne"];
    delete: operations["ProductsController_remove"];
    patch: operations["ProductsController_update"];
  };
  "/cart": {
    get: operations["CartController_getCart"];
  };
  "/cart/add": {
    post: operations["CartController_addProductToCart"];
  };
  "/cart/add-many": {
    post: operations["CartController_addProductsToCart"];
  };
  "/cart/product/{productId}": {
    delete: operations["CartController_removeItem"];
  };
  "/cart/clear": {
    delete: operations["CartController_clear"];
  };
  "/orders": {
    get: operations["OrdersController_findAll"];
    post: operations["OrdersController_create"];
  };
  "/orders/my": {
    get: operations["OrdersController_findMy"];
  };
  "/orders/{id}": {
    get: operations["OrdersController_findOne"];
    delete: operations["OrdersController_remove"];
    patch: operations["OrdersController_update"];
  };
  "/orders/cancel": {
    post: operations["OrdersController_cancel"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    AuthDto: {
      phone: string;
      password: string;
    };
    PermissionEntity: {
      id: number;
      name: string;
    };
    RoleEntity: {
      permissions?: (components["schemas"]["PermissionEntity"])[];
      id: number;
      name: string;
    };
    UserEntity: {
      roles: (components["schemas"]["RoleEntity"])[];
      /** @enum {string|null} */
      gender: "MALE" | "FEMALE" | null;
      id: number;
      name: string | null;
      email: string;
      /** Format: date-time */
      createdAt: string;
      phone: string;
      /** Format: date-time */
      birthDate: string | null;
    };
    LoginResponseDto: {
      user: components["schemas"]["UserEntity"];
      accessToken: string;
      refreshToken: string;
    };
    BadRequestResponseDto: {
      /** @default 400 */
      statusCode: number;
      message: (string)[] | string;
      error: string;
    };
    RefreshTokenDto: {
      token: string;
    };
    RegisterDto: {
      phone: string;
      name: string;
      password: string;
    };
    CodeResponseDto: {
      /** @description If enable debug on sms sending */
      code?: string;
    };
    ResendRegisterSms: {
      phone: string;
    };
    ConfirmResetPasswordDto: {
      phone: string;
      password: string;
      code: string;
    };
    ConfirmDto: {
      phone: string;
      code: string;
    };
    CreateUserDto: {
      name: string;
      phone: string;
      password: string;
      birthDate?: string;
      gender?: Record<string, never>;
    };
    UpdateUserDto: {
      name?: string;
      phone?: string;
      password?: string;
      birthDate?: string;
      gender?: Record<string, never>;
    };
    AttachRoleDto: {
      roles: (number)[];
    };
    CreateRoleDto: {
      name: string;
      permissions: (number)[];
    };
    UpdateRoleDto: {
      name?: string;
      permissions?: (number)[];
    };
    CreateDeliveryLocationDto: {
      address: string;
      isPrivateHouse: boolean;
      apartment?: string | null;
      comment?: string | null;
      floor?: string | null;
      porch?: string | null;
    };
    DeliveryLocationEntity: {
      address: string;
      apartment: string | null;
      comment: string;
      floor: string | null;
      id: number;
      isPrivateHouse: boolean;
      porch: string | null;
    };
    UpdateDeliveryLocationDto: {
      address?: string;
      isPrivateHouse?: boolean;
      apartment?: string | null;
      comment?: string | null;
      floor?: string | null;
      porch?: string | null;
    };
    CreateCategoryDto: {
      name: string;
    };
    ProductImageEntity: {
      /** @enum {string} */
      provider: "LOCAL";
      id: number;
      path: string;
    };
    ProductEntity: {
      productImage?: components["schemas"]["ProductImageEntity"];
      id: number;
      categoryId: number;
      description: string;
      discount: number;
      name: string;
      price: number;
    };
    CategoryEntity: {
      products?: (components["schemas"]["ProductEntity"])[] | null;
      id: number;
      name: string;
    };
    UpdateCategoryDto: {
      name?: string;
    };
    CreateProductDto: {
      categoryId: number;
      description: string;
      name: string;
      discount: number;
      price: number;
      productImageId: number;
    };
    CreateProductImageDto: {
      /** Format: binary */
      file: string;
    };
    PageMetaDto: {
      page: number;
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
    PaginatedResponseDto: {
      data: ((unknown)[])[];
      meta: components["schemas"]["PageMetaDto"];
    };
    UpdateProductDto: {
      categoryId?: number;
      description?: string;
      name?: string;
      discount?: number;
      price?: number;
      productImageId?: number;
    };
    ProductsOnCartEntity: {
      product: components["schemas"]["ProductEntity"];
      /** Format: date-time */
      addetAt: string;
      cartId: number;
      productId: number;
      quantity: number;
    };
    CartEntity: {
      products: (components["schemas"]["ProductsOnCartEntity"])[];
      id: number;
      userId: number;
    };
    AddToCartRequestDto: {
      productId: number;
    };
    AddMultipleItemToCartDto: {
      productId: number;
      quantity: number;
    };
    AddMultipleToCartRequestDto: {
      items: (components["schemas"]["AddMultipleItemToCartDto"])[];
    };
    CreateOrderRequestDto: {
      /** @enum {string} */
      type: "PICKUP" | "DELIVERY";
      /** @enum {string|null} */
      paymentType: "UPON_RECEIPT_IN_CASH" | "UPON_RECEIPT_BY_CARD" | null;
      deliveryLocationId: number;
      location: string | null;
    };
    ProductsOnOrdersEntity: {
      product: components["schemas"]["ProductEntity"];
      id: number;
      discount: number;
      orderId: number;
      price: number;
      productId: number;
      quantity: number;
    };
    OrderEntity: {
      /** @enum {string|null} */
      paymentType: "UPON_RECEIPT_IN_CASH" | "UPON_RECEIPT_BY_CARD" | null;
      /** @enum {string} */
      status: "CREATED" | "IN_PROGRESS" | "DELIVERED" | "CANCELED" | "COMPLETED";
      /** @enum {string} */
      type: "PICKUP" | "DELIVERY";
      deliveryLocation: components["schemas"]["DeliveryLocationEntity"];
      products: components["schemas"]["ProductsOnOrdersEntity"];
      orderCancellations?: components["schemas"]["ProductsOnOrdersEntity"] | null;
      id: number;
      userId: number;
      deliveryLocationId: number | null;
      location: string | null;
      price: number;
      /** Format: date-time */
      updatedAt: string | null;
      /** Format: date-time */
      createdAt: string;
    };
    CreateOrderItemsDto: {
      discount: number;
      price: number;
      productId: number;
      quantity: number;
    };
    UpdateOrderDto: {
      status: Record<string, never>;
      userId?: number;
      deliveryLocationId?: number | null;
      location?: string | null;
      price?: number;
      paymentType?: Record<string, unknown> | null;
      type?: Record<string, never>;
      items?: (components["schemas"]["CreateOrderItemsDto"])[];
    };
    CancelOrderDto: {
      description: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /** @description Authorization in the system */
  AuthController_login: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["LoginResponseDto"];
        };
      };
      400: {
        content: {
          "application/json": components["schemas"]["BadRequestResponseDto"];
        };
      };
    };
  };
  /** @description Token refresh */
  AuthController_refreshToken: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RefreshTokenDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["LoginResponseDto"];
        };
      };
    };
  };
  /** @description Registration */
  AuthController_register: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RegisterDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["CodeResponseDto"];
        };
      };
    };
  };
  /** @description Submit password reset verification code */
  PasswordController_sendResetPasswordCode: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ResendRegisterSms"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["CodeResponseDto"];
        };
      };
      400: {
        content: {
          "application/json": components["schemas"]["BadRequestResponseDto"];
        };
      };
      404: never;
    };
  };
  /** @description Resend verification code */
  PasswordController_resendConfirmation: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ResendRegisterSms"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["CodeResponseDto"];
        };
      };
    };
  };
  /** @description Confirm password change */
  PasswordController_register: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ConfirmResetPasswordDto"];
      };
    };
    responses: {
      201: never;
    };
  };
  /** @description Confirm phone and end registration */
  PhoneConfirmationController_confirm: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ConfirmDto"];
      };
    };
    responses: {
      200: never;
      201: never;
    };
  };
  /** @description Resend verification phone code */
  PhoneConfirmationController_resendConfirmation: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ResendRegisterSms"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["CodeResponseDto"];
        };
      };
    };
  };
  UsersController_findAll: {
    responses: {
      200: {
        content: {
          "application/json": (components["schemas"]["UserEntity"])[];
        };
      };
    };
  };
  UsersController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateUserDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["UserEntity"];
        };
      };
    };
  };
  UsersController_findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserEntity"];
        };
      };
    };
  };
  UsersController_remove: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: never;
    };
  };
  UsersController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateUserDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserEntity"];
        };
      };
    };
  };
  /** @description Установить роли пользователю */
  UsersController_setRoles: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AttachRoleDto"];
      };
    };
    responses: {
      200: never;
      201: {
        content: {
          "application/json": components["schemas"]["UserEntity"];
        };
      };
    };
  };
  UsersController_me: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserEntity"];
        };
      };
    };
  };
  RolesController_findAll: {
    responses: {
      200: {
        content: {
          "application/json": (components["schemas"]["RoleEntity"])[];
        };
      };
    };
  };
  RolesController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateRoleDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["RoleEntity"];
        };
      };
      201: never;
    };
  };
  RolesController_findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["RoleEntity"];
        };
      };
    };
  };
  RolesController_remove: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: never;
    };
  };
  RolesController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateRoleDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
    };
  };
  /** @description Список доступов системы */
  RolesController_getPermissions: {
    responses: {
      200: {
        content: {
          "application/json": (components["schemas"]["PermissionEntity"])[];
        };
      };
    };
  };
  DeliveryLocationsController_findAll: {
    parameters: {
      query: {
        search?: string;
        isPrivateHouse?: boolean;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": (components["schemas"]["DeliveryLocationEntity"])[];
        };
      };
    };
  };
  DeliveryLocationsController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateDeliveryLocationDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["DeliveryLocationEntity"];
        };
      };
    };
  };
  DeliveryLocationsController_findMy: {
    parameters: {
      query: {
        search?: string;
        isPrivateHouse?: boolean;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": (components["schemas"]["DeliveryLocationEntity"])[];
        };
      };
    };
  };
  DeliveryLocationsController_findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["DeliveryLocationEntity"];
        };
      };
    };
  };
  DeliveryLocationsController_remove: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: never;
    };
  };
  DeliveryLocationsController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateDeliveryLocationDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["DeliveryLocationEntity"];
        };
      };
    };
  };
  CategoriesController_findAll: {
    responses: {
      200: {
        content: {
          "application/json": (components["schemas"]["CategoryEntity"])[];
        };
      };
    };
  };
  CategoriesController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateCategoryDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["CategoryEntity"];
        };
      };
    };
  };
  CategoriesController_findAllWithProducts: {
    responses: {
      200: {
        content: {
          "application/json": (components["schemas"]["CategoryEntity"])[];
        };
      };
    };
  };
  CategoriesController_findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["CategoryEntity"];
        };
      };
    };
  };
  CategoriesController_remove: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: never;
    };
  };
  CategoriesController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateCategoryDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["CategoryEntity"];
        };
      };
    };
  };
  ProductsController_findAll: {
    parameters: {
      query: {
        /** @description Номер страницы */
        page?: number;
        /** @description Количество элементов на странице */
        take?: number;
        /** @description Порядок сортировки */
        sortOrder?: "asc" | "desc";
        /** @description Поле для сортировки */
        sortBy?: string;
        categoryId?: number;
        search?: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["PaginatedResponseDto"] & {
            data?: (components["schemas"]["ProductEntity"])[];
          };
        };
      };
    };
  };
  ProductsController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateProductDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["ProductEntity"];
        };
      };
    };
  };
  ProductsController_uploadImage: {
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["CreateProductImageDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": Record<string, never>;
        };
      };
    };
  };
  ProductsController_findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["ProductEntity"];
        };
      };
    };
  };
  ProductsController_remove: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: never;
    };
  };
  ProductsController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateProductDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["ProductEntity"];
        };
      };
    };
  };
  CartController_getCart: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["CartEntity"];
        };
      };
    };
  };
  CartController_addProductToCart: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AddToCartRequestDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": Record<string, never>;
        };
      };
    };
  };
  CartController_addProductsToCart: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AddMultipleToCartRequestDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": Record<string, never>;
        };
      };
    };
  };
  CartController_removeItem: {
    parameters: {
      path: {
        productId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
    };
  };
  CartController_clear: {
    responses: {
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
    };
  };
  OrdersController_findAll: {
    parameters: {
      query: {
        /** @description Номер страницы */
        page?: number;
        /** @description Количество элементов на странице */
        take?: number;
        /** @description Порядок сортировки */
        sortOrder?: "asc" | "desc";
        /** @description Поле для сортировки */
        sortBy?: string;
        search?: string;
        status?: "CREATED" | "IN_PROGRESS" | "DELIVERED" | "CANCELED" | "COMPLETED";
        type?: "PICKUP" | "DELIVERY";
        paymentType?: "UPON_RECEIPT_IN_CASH" | "UPON_RECEIPT_BY_CARD";
        createdAtFrom?: string;
        createdAtTo?: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["PaginatedResponseDto"] & {
            data?: (components["schemas"]["OrderEntity"])[];
          };
        };
      };
    };
  };
  OrdersController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateOrderRequestDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["OrderEntity"];
        };
      };
    };
  };
  OrdersController_findMy: {
    parameters: {
      query: {
        /** @description Номер страницы */
        page?: number;
        /** @description Количество элементов на странице */
        take?: number;
        /** @description Порядок сортировки */
        sortOrder?: "asc" | "desc";
        /** @description Поле для сортировки */
        sortBy?: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["PaginatedResponseDto"] & {
            data?: (components["schemas"]["OrderEntity"])[];
          };
        };
      };
    };
  };
  OrdersController_findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OrderEntity"];
        };
      };
    };
  };
  OrdersController_remove: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: never;
    };
  };
  OrdersController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateOrderDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OrderEntity"];
        };
      };
    };
  };
  OrdersController_cancel: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CancelOrderDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": Record<string, never>;
        };
      };
    };
  };
}

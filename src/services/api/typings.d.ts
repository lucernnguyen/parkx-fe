declare namespace API {
  type Address = {
    address_line_1?: string;
    admin_area_2?: string;
    country_code?: string;
  };

  type Amount = {
    value?: number;
    currency_code?: 'VND' | 'USD';
    breakdown?: Breakdown;
  };

  type BasePagingResponseGroupInfo = {
    content?: GroupInfo[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
  };

  type BasePagingResponseParkingSlotInfo = {
    content?: ParkingSlotInfo[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
  };

  type BasePagingResponseTransactionInfo = {
    content?: TransactionInfo[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
  };

  type BasePagingResponseUserInfo = {
    content?: UserInfo[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
  };

  type BasePagingResponseWalletInfo = {
    content?: WalletInfo[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
  };

  type BaseResponseBasePagingResponseGroupInfo = {
    success?: boolean;
    data?: BasePagingResponseGroupInfo;
  };

  type BaseResponseBasePagingResponseParkingSlotInfo = {
    success?: boolean;
    data?: BasePagingResponseParkingSlotInfo;
  };

  type BaseResponseBasePagingResponseTransactionInfo = {
    success?: boolean;
    data?: BasePagingResponseTransactionInfo;
  };

  type BaseResponseBasePagingResponseUserInfo = {
    success?: boolean;
    data?: BasePagingResponseUserInfo;
  };

  type BaseResponseBasePagingResponseWalletInfo = {
    success?: boolean;
    data?: BasePagingResponseWalletInfo;
  };

  type BaseResponseGroupDetailsExtendedDetails = {
    success?: boolean;
    data?: GroupDetailsExtendedDetails;
  };

  type BaseResponseGroupInfo = {
    success?: boolean;
    data?: GroupInfo;
  };

  type BaseResponseListPermissionInfo = {
    success?: boolean;
    data?: PermissionInfo[];
  };

  type BaseResponseListRevenueChart = {
    success?: boolean;
    data?: RevenueChart[];
  };

  type BaseResponseListVehicleChart = {
    success?: boolean;
    data?: VehicleChart[];
  };

  type BaseResponseListVehicleTypeInfo = {
    success?: boolean;
    data?: VehicleTypeInfo[];
  };

  type BaseResponseParkingInfo = {
    success?: boolean;
    data?: ParkingInfo;
  };

  type BaseResponseParkingSessionByTodayAndCurrentMonth = {
    success?: boolean;
    data?: ParkingSessionByTodayAndCurrentMonth;
  };

  type BaseResponseParkingSlotInfo = {
    success?: boolean;
    data?: ParkingSlotInfo;
  };

  type BaseResponseParkingSlotInfoExtendedDetails = {
    success?: boolean;
    data?: ParkingSlotInfoExtendedDetails;
  };

  type BaseResponseRevenueByTodayAndCurrentMonth = {
    success?: boolean;
    data?: RevenueByTodayAndCurrentMonth;
  };

  type BaseResponseSuccessResponse = {
    success?: boolean;
    data?: SuccessResponse;
  };

  type BaseResponseTransactionDetails = {
    success?: boolean;
    data?: TransactionDetails;
  };

  type BaseResponseUserDetails = {
    success?: boolean;
    data?: UserDetails;
  };

  type BaseResponseUserDetailsExtendedDetails = {
    success?: boolean;
    data?: UserDetailsExtendedDetails;
  };

  type BaseResponseVehicleTypeInfo = {
    success?: boolean;
    data?: VehicleTypeInfo;
  };

  type BaseResponseVehicleTypeInfoExtendedDetails = {
    success?: boolean;
    data?: VehicleTypeInfoExtendedDetails;
  };

  type Breakdown = {
    total?: number;
    item_total?: Money;
    shipping?: Money;
    shipping_discount?: Money;
    discount?: Money;
  };

  type CreateOrderResponse = {
    id?: string;
    status?: 'CREATED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'COMPLETED' | 'PAYER_ACTION_REQUIRED';
    create_time?: string;
    links?: Link[];
    purchase_units?: PurchaseUnit[];
  };

  type ErrorResponse = {
    success?: boolean;
    data?: Record<string, any>;
    title?: string;
    subTitle?: string;
    message?: string;
    code?: string;
  };

  type GroupDetailsCreate = {
    name: string;
    description?: string;
    kind: 'CMS' | 'SUPER_ADMIN' | 'USER';
    defaultGroup?: boolean;
    permissions?: string[];
  };

  type GroupDetailsExtendedDetails = {
    id?: string;
    name: string;
    description?: string;
    kind: 'CMS' | 'SUPER_ADMIN' | 'USER';
    defaultGroup?: boolean;
    permissions?: string[];
  };

  type GroupDetailsUpdate = {
    id?: string;
    description?: string;
    kind: 'CMS' | 'SUPER_ADMIN' | 'USER';
    defaultGroup?: boolean;
    permissions?: string[];
  };

  type GroupInfo = {
    id?: string;
    name: string;
    description?: string;
    kind: 'CMS' | 'SUPER_ADMIN' | 'USER';
    defaultGroup?: boolean;
  };

  type Item = {
    name?: string;
    quantity?: number;
    description?: string;
    unit_amount?: Money;
  };

  type Link = {
    href?: string;
    rel?: string;
    method?: string;
  };

  type Money = {
    value?: number;
    currency_code?: 'VND' | 'USD';
  };

  type Name = {
    given_name?: string;
    sur_name?: string;
  };

  type ParkingInfo = {
    id?: string;
    name: string;
    description?: string;
    active?: boolean;
    fullSlot?: boolean;
  };

  type ParkingSessionByTodayAndCurrentMonth = {
    today?: SessionStatus;
    currentMonth?: SessionStatus;
  };

  type ParkingSlotInfo = {
    id?: string;
    name?: string;
    rowIndex?: number;
    columnIndex?: number;
    hasParking?: boolean;
    parkingId?: string;
  };

  type ParkingSlotInfoCreate = {
    name?: string;
    rowIndex?: number;
    columnIndex?: number;
    hasParking?: boolean;
    parkingId?: string;
  };

  type ParkingSlotInfoExtendedDetails = {
    id?: string;
    name?: string;
    rowIndex?: number;
    columnIndex?: number;
    hasParking?: boolean;
    parkingId?: string;
  };

  type ParkingSlotInfoUpdate = {
    id?: string;
    name?: string;
    rowIndex?: number;
    columnIndex?: number;
    hasParking?: boolean;
  };

  type PermissionInfo = {
    id?: string;
    name?: string;
    action?: string;
    showMenu?: boolean;
    description?: string;
    nameGroup?: string;
  };

  type PurchaseUnit = {
    reference_id?: string;
    description?: string;
    custom_id?: string;
    amount?: Amount;
    items?: Item[];
    shipping?: Shipping;
  };

  type RevenueByTodayAndCurrentMonth = {
    today?: number;
    currentMonth?: number;
  };

  type RevenueChart = {
    date?: string;
    amount?: number;
  };

  type RevenueStatisticRequest = {
    from?: string;
    to?: string;
  };

  type SessionStatus = {
    checkedIn?: number;
    checkedOut?: number;
  };

  type Shipping = {
    type?: 'SHIPPING' | 'PICKUP_IN_PERSON';
    name?: Name;
    address?: Address;
  };

  type SuccessResponse = {
    success?: boolean;
  };

  type SystemGroupControllerChangeDefaultGroupParams = {
    id: string;
  };

  type SystemGroupControllerDeleteModelByIdParams = {
    id: string;
  };

  type SystemGroupControllerGetInfoByIdParams = {
    id: string;
  };

  type SystemGroupControllerGetInfoPageWithFilterParams = {
    number?: number;
    size?: number;
  };

  type SystemParkingSlotControllerDeleteModelByIdParams = {
    id: string;
  };

  type SystemParkingSlotControllerGetDetailByIdParams = {
    id: string;
  };

  type SystemParkingSlotControllerGetInfoPageWithFilterParams = {
    number?: number;
    size?: number;
  };

  type SystemPermissionControllerGetInfoListWithFilterParams = {
    groupId?: string;
  };

  type SystemStatisticControllerRevenueByDateChartParams = {
    request: RevenueStatisticRequest;
  };

  type SystemTransactionControllerGetDetailByIdParams = {
    id: string;
  };

  type SystemTransactionControllerGetInfoPageWithFilterParams = {
    email?: string;
    startDate?: string;
    endDate?: string;
    number?: number;
    size?: number;
  };

  type SystemUserControllerDeleteModelByIdParams = {
    id: string;
  };

  type SystemUserControllerGetDetailByIdParams = {
    id: string;
  };

  type SystemUserControllerGetInfoPageWithFilterParams = {
    email?: string;
    phone?: string;
    number?: number;
    size?: number;
  };

  type SystemVehicleTypeControllerDeleteModelByIdParams = {
    id: number;
  };

  type SystemVehicleTypeControllerGetDetailByIdParams = {
    id: number;
  };

  type SystemWalletControllerGetInfoPageWithFilterParams = {
    number?: number;
    size?: number;
  };

  type TransactionDetails = {
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    userEmail?: string;
    balance?: number;
    amount?: number;
    status?: 'SUCCESS' | 'FAILED' | 'PENDING';
    transactionType?: 'DEPOSIT' | 'PAYMENT';
    orderData?: CreateOrderResponse;
    refTransactionId?: string;
    walletId?: string;
    userId?: string;
  };

  type TransactionInfo = {
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    userEmail?: string;
    balance?: number;
    amount?: number;
    status?: 'SUCCESS' | 'FAILED' | 'PENDING';
    transactionType?: 'DEPOSIT' | 'PAYMENT';
  };

  type UserDetails = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    active?: boolean;
    username?: string;
    groupId?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: 'MALE' | 'FEMALE';
    idCardNo?: string;
    idCardIssuedDate?: string;
    idCardIssuedBy?: string;
  };

  type UserDetailsCreate = {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    active?: boolean;
    username?: string;
    groupId?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: 'MALE' | 'FEMALE';
    idCardNo?: string;
    idCardIssuedDate?: string;
    idCardIssuedBy?: string;
  };

  type UserDetailsExtendedDetails = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    active?: boolean;
    username?: string;
    groupId?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: 'MALE' | 'FEMALE';
    idCardNo?: string;
    idCardIssuedDate?: string;
    idCardIssuedBy?: string;
  };

  type UserDetailsUpdate = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    active?: boolean;
    groupId?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: 'MALE' | 'FEMALE';
    idCardNo?: string;
    idCardIssuedDate?: string;
    idCardIssuedBy?: string;
  };

  type UserInfo = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    active?: boolean;
    username?: string;
    groupId?: string;
  };

  type VehicleChart = {
    vehicleName?: string;
    amount?: number;
  };

  type VehicleTypeInfo = {
    id?: number;
    name: string;
    active?: boolean;
    totalSlot?: number;
    price?: number;
  };

  type VehicleTypeInfoCreate = {
    name: string;
    active?: boolean;
    totalSlot?: number;
    price?: number;
  };

  type VehicleTypeInfoExtendedDetails = {
    id?: number;
    name: string;
    active?: boolean;
    totalSlot?: number;
    price?: number;
  };

  type VehicleTypeInfoUpdate = {
    id?: number;
    name: string;
    active?: boolean;
    totalSlot?: number;
    price?: number;
  };

  type WalletInfo = {
    id?: string;
    balance?: number;
    debt?: number;
    userId?: string;
  };
}

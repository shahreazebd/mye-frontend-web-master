// ===================
// Inventory page
// ===================

export const newProductFormValidate = {
  name: [
    {
      required: true,
      message: "Please enter Name",
    },
  ],
  sku: [
    {
      required: true,
      message: "Please enter SKU",
    },
  ],
  barcode: [
    {
      required: true,
      message: "Please enter SKU",
    },
  ],
};

// ===================
// Location Form
// ===================

export const newLocationFormValidate = {
  name: [
    {
      required: true,
      message: "Please enter Name",
    },
  ],
  address: [
    {
      required: true,
      message: "Please enter Address",
    },
  ],
};

// ===================
// Register Form
// ===================

export const registerFormValidate = {
  firstName: [
    {
      required: true,
      message: "Please input your First Name!",
    },
  ],
  lastName: [
    {
      required: true,
      message: "Please input your Last Name!",
    },
  ],
  email: [
    {
      required: true,
      message: "This is not valid Email!",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input your password!",
    },
    {
      pattern: new RegExp("(?=.*?[A-Z])"),
      message: "Password must contain one Capital letter!",
    },
    {
      pattern: new RegExp("(?=.*?[0-9])"),
      message: "Password must contain one Numeric digit!",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }: any) => ({
      validator(_: any, value: any) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }

        return Promise.reject(
          new Error("The two passwords that you entered do not match!")
        );
      },
    }),
  ],
  phone: [
    {
      required: true,
      message: "Please input your Phone Number!",
    },
    {
      message: "Please enter only numbers",
      pattern: new RegExp("^[0-9]*$"),
    },
  ],
  company_name: [
    {
      required: true,
      message: "Please input your Company Name!",
    },
  ],
  company_address: [
    {
      required: true,
      message: "Please input your Company Address!",
    },
  ],
  country: [
    {
      required: true,
      message: "Please select Country!",
    },
  ],
};

// ===================
//    owner Form
// ===================

export const addOwnerFormValidate = {
  email: [
    {
      required: true,
      message: "Please input your Email!",
    },
  ],
};

// ===================
//    user edit Form
// ===================

export const userEditFormValidate = {
  firstName: [
    {
      required: true,
      message: "Please input your First Name!",
    },
  ],
  lastName: [
    {
      required: true,
      message: "Please input your Last Name!",
    },
  ],
};

// ===============================
// Channel Integration Drawer Form
// ===============================

export const channelIntegrationDrawerForm = {
  name: [
    {
      required: true,
      message: "Please enter Name",
    },
  ],
  country: [
    {
      required: true,
      message: "Please select Country",
    },
  ],
  channelMaxStock: [
    {
      required: true,
      message: "Please enter Max Stock",
    },
  ],
  locationId: [
    {
      required: true,
      message: "Please select Location",
    },
  ],
};

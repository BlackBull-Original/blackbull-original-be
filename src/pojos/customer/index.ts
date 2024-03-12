import mongoose, { Schema, model } from "mongoose";
import customerCounter from "./customerId";

interface CustomerDetails {
  avatar: string;
  companyName: string;
  tradingName: string;
  abnNumber: number;
  legalName: string;
  websiteAddress: string;
  customerId: number;
  firstName: string;
  lastName: string;
  designation: string;

  companyAddress: {
    street1: string;
    street2: string;
    suburb: string;
    state: string;
    country: string;
    postCode: string;
  };

  accountPayble: {
    contactPerson: string;
    designation: string;
    contactNumber: string;
    accountsPaybleEmail: string;
  };

  accountReceivable: {
    contactPerson: string;
    designation: string;
    contactNumber: string;
    accountsReceivableEmail: string;
  };

  opreations: {
    contactPerson: string;
    designation: string;
    contactNumber: string;
    opreationsEmail: string;
  };

  compliance: {
    contactPerson: string;
    designation: string;
    contactNumber: string;
    complianceEmail: string;
  };

  admin: {
    contactPerson: string;
    designation: string;
    contactNumber: string;
    adminEmail: string;
  };

  invoicePrefrences: string;
  invoiceCommunicationPrefrences: string;

  companySuiteDetails: [
    {
      designation: string;
      directorEmailAddress: string;
      directorContactNumber: string;
    }
  ];

  payment: {
    accountName: string;
    bankName: string;
    bsb: string;
    accountNumber: string;
  };
  paymentTerm: string;

  warehouseLocation: {
    street1: string;
    street2: string;
    suburb: string;
    state: string;
    country: string;
    postCode: string;
  };

  document: [];

  Admin: mongoose.Schema.Types.ObjectId;
}

const customerSchema = new Schema<CustomerDetails>(
  {
    avatar: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    tradingName: {
      type: String,
      required: false,
    },
    abnNumber: {
      type: Number,
      required: false,
    },
    legalName: {
      type: String,
      required: false,
    },
    websiteAddress: {
      type: String,
      required: false,
    },
    customerId: {
      type: Number,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    designation: {
      type: String,
      required: false,
    },

    companyAddress: {
      street1: {
        type: String,
        required: false,
      },
      street2: {
        type: String,
        required: false,
      },
      suburb: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
      postCode: {
        type: String,
        required: false,
      },
    },

    accountPayble: {
      contactPerson: {
        type: String,
        required: false,
      },
      designation: {
        type: String,
        required: false,
      },
      contactNumber: {
        type: String,
        required: false,
      },
      accountsPaybleEmail: {
        type: String,
        required: false,
      },
    },

    accountReceivable: {
      contactPerson: {
        type: String,
        required: false,
      },
      designation: {
        type: String,
        required: false,
      },
      contactNumber: {
        type: String,
        required: false,
      },
      accountsReceivableEmail: {
        type: String,
        required: false,
      },
    },

    opreations: {
      contactPerson: {
        type: String,
        required: false,
      },
      designation: {
        type: String,
        required: false,
      },
      contactNumber: {
        type: String,
        required: false,
      },
      opreationsEmail: {
        type: String,
        required: false,
      },
    },

    compliance: {
      contactPerson: {
        type: String,
        required: false,
      },
      designation: {
        type: String,
        required: false,
      },
      contactNumber: {
        type: String,
        required: false,
      },
      complianceEmail: {
        type: String,
        required: false,
      },
    },

    admin: {
      contactPerson: {
        type: String,
        required: false,
      },
      designation: {
        type: String,
        required: false,
      },
      contactNumber: {
        type: String,
        required: false,
      },
      adminEmail: {
        type: String,
        required: false,
      },
    },

    invoicePrefrences: {
      type: String,
      required: false,
    },
    invoiceCommunicationPrefrences: {
      type: String,
      required: false,
    },

    companySuiteDetails: [
      {
        designation: {
          type: String,
          required: false,
        },
        directorEmailAddress: {
          type: String,
          required: false,
        },
        directorContactNumber: {
          type: String,
          required: false,
        },
      },
    ],

    payment: {
      accountName: {
        type: String,
        required: false,
      },
      bankName: {
        type: String,
        required: false,
      },
      bsb: {
        type: String,
        required: false,
      },
      accountNumber: {
        type: String,
        required: false,
      },
    },
    paymentTerm: {
      type: String,
      required: false,
    },

    warehouseLocation: {
      street1: {
        type: String,
        required: false,
      },
      street2: {
        type: String,
        required: false,
      },
      suburb: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
      postCode: {
        type: String,
        required: false,
      },
    },

    document: [
      {
        type: String,
        required: false,
      },
    ],
    Admin: { ref: "users", type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

customerSchema.pre("save", function(next) {
  customerCounter.findByIdAndUpdate(
    { _id: "customerId" },
    { $inc: { customerSeq: 1 } },
    { new: true, upsert: true },
    (err, counter) => {
      if (err) {
        return next(err);
      }
      this.customerId = counter.customerSeq;
      next();
    }
  );
});

export default model<CustomerDetails>("customer", customerSchema);

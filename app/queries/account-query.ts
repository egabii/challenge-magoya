import { useMutation } from "@tanstack/react-query";
import { accountsCollection } from "@/lib/mock-data/accounts";
import { transactionsCollection } from "@/lib/mock-data/transactions";
import { IAccount, ITransaction, TransactionType } from "@/lib/definitions";
import { incrementBalance, decrementBalance } from "@/app/store/accounts-slice";
import {
  setTransactions,
  selectTransactions,
} from "@/app/store/transactions-slice";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";

const error = false;
interface IMutateBalanceType extends Omit<IAccount, "id" | "name"> {
  type: TransactionType;
}

/* const getAccountById = (id: number): Promise<IAccount> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject({ message: "cannot fetch account detail right now" });
      } else {
        const foundAccount = accountsCollection.find(
          (account) => account.id === id
        );
        if (!foundAccount) {
          reject({ message: "could not find accountw" });
        } else {
          resolve(foundAccount);
        }
      }
    }, 2000);
  }); */

const loginAccount = (accountNumber: number): Promise<IAccount> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject({ message: "cannot fetch account detail right now" });
      } else {
        const foundAccount = accountsCollection.find(
          (account) => account.accountNumber === accountNumber
        );
        if (!foundAccount) {
          reject({ message: "could not find accountw" });
        } else {
          resolve(foundAccount);
        }
      }
    }, 2000);
  });

const createAccount = (payload: Omit<IAccount, "id">): Promise<IAccount> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject({ message: "cannot fetch account detail right now" });
      } else {
        const foundAccount = accountsCollection.find(
          (account) => account.accountNumber === payload.accountNumber
        );
        if (foundAccount) {
          reject({ message: "account number already exist not find account" });
        } else {
          const lastItemId =
            accountsCollection[accountsCollection.length - 1].id;
          const newAccount = {
            ...payload,
            id: lastItemId + 1,
          };
          accountsCollection.push({
            ...newAccount,
            id: lastItemId + 1,
          });
          resolve(newAccount);
        }
      }
    }, 2000);
  });

const updateBalance = (payload: IMutateBalanceType): Promise<IAccount> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject({ message: "cannot fetch account detail right now" });
      } else {
        const foundAccount = accountsCollection.find(
          (account) => account.accountNumber === payload.accountNumber
        );
        if (!foundAccount) {
          reject({ message: "could not find accountw" });
        } else {
          if (payload.balance) {
            if (payload.type === "Deposito") {
              foundAccount.balance += payload.balance;
            } else {
              foundAccount.balance -= payload.balance;
            }
          }
          resolve(foundAccount);
        }
      }
    }, 2000);
  });

export const useMutateBalance = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const { data, error, isError, isPending, isSuccess, mutate, status } =
    useMutation({
      mutationFn: updateBalance,
      onSuccess: (_, variables) => {
        if (variables.type === "Deposito") {
          dispatch(incrementBalance(variables.balance));
        } else {
          dispatch(decrementBalance(variables.balance));
        }

        const lastTransactions = transactions[transactions.length - 1];
        const nextTransactionId = !!lastTransactions
          ? parseInt(lastTransactions.id.split("_")[1]) + 1
          : "0";
        dispatch(
          setTransactions(
            [
              ...transactions,
              {
                id: `tx_${nextTransactionId}`,
                amount: variables.balance,
                transactionType: variables.type,
                createdAt: new Date().toISOString().split(".")[0],
                accountNumber: variables.accountNumber,
              },
            ].filter(
              (t: ITransaction) => t.accountNumber === variables.accountNumber
            )
          )
        );
      },
    });

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
    status,
  };
};

export const useLoginAccount = () => {
  const dispatch = useAppDispatch();
  const { data, error, isError, isPending, isSuccess, mutate, status } =
    useMutation({
      mutationFn: loginAccount,
      onSuccess: (_, variables) => {
        dispatch(
          setTransactions(
            transactionsCollection.filter((t) => t.accountNumber === variables)
          )
        );
      },
    });

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
    status,
  };
};

export const useCreateAccount = () => {
  const dispatch = useAppDispatch();
  const { data, error, isError, isPending, isSuccess, mutate, status } =
    useMutation({
      mutationFn: createAccount,
      onSuccess: () => {
        dispatch(setTransactions([]));
      },
    });

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
    status,
  };
};

/* export const useQueryTransactions = () => {
  const { data, isLoading, error, ...rest } = useQuery<IAccount>({
    queryKey: ["transactions"],
    queryFn: () => getAccountById(transactionsCollection),
    initialData: initialState,
  });

  return {
    data,
    isLoading,
    error,
    ...rest,
  };
};
export const useAccountQuery = (accountID: number) => {
  const { data, isLoading, error, ...rest } = useQuery<IAccount>({
    queryKey: ["account", accountID],
    queryFn: () => getAccountById(accountID),
    initialData: initialState,
  });

  return {
    data,
    isLoading,
    error,
    ...rest,
  };
};
 */

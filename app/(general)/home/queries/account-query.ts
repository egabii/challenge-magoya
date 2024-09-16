import { useMutation } from "@tanstack/react-query";
import { accountsCollection } from "@/lib/mock-data/accounts";
import { transactionsCollection } from "@/lib/mock-data/transactions";
import { IAccount } from "@/lib/definitions";
import { incrementBalance, decrementBalance } from "@/app/store/accounts-slice";
import {
  setTransactions,
  selectTransactions,
} from "@/app/store/transactions-slice";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";

const error = false;
interface IMutateBalanceType extends Omit<IAccount, "id" | "name"> {
  type: "Deposito" | "Retiro";
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

const updateBalance = (deposit: IMutateBalanceType): Promise<IAccount> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject({ message: "cannot fetch account detail right now" });
      } else {
        const foundAccount = accountsCollection.find(
          (account) => account.accountNumber === deposit.accountNumber
        );
        if (!foundAccount) {
          reject({ message: "could not find accountw" });
        } else {
          if (deposit.balance) {
            foundAccount.balance = deposit.balance;
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
        const nextTransactionId =
          parseInt(lastTransactions.id.split("_")[1]) + 1;
        dispatch(
          setTransactions([
            ...transactions,
            {
              id: `tx_${nextTransactionId}`,
              amount: variables.balance,
              transactionType: variables.type,
              createdAt: new Date().toISOString().split(".")[0],
            },
          ])
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
      onSuccess: () => {
        dispatch(setTransactions(transactionsCollection));
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

import { MappingProduct } from "@/types/mapping-product";
import useAuth from "@/hooks/custom/useAuth";
import useUpdateRemoteProduct from "@/hooks/queries/inventory/use-update-remote-product";
import { Switch } from "@/components/ui/switch";

type Props = {
  row: MappingProduct;
};

export function MappingProductTableAction(props: Readonly<Props>) {
  const { userInformation } = useAuth();

  const { mutate: updateRemoteProduct, isLoading } = useUpdateRemoteProduct();

  function onCheckedHandler(value: boolean) {
    const payload = {
      company_uid: userInformation?.company_uid as string,
      data: [
        {
          channel_uid: props?.row?.channel_uid,
          remote_product: props?.row?.remote_product,
          sync_inventory: value,
        },
      ],
    };

    updateRemoteProduct(payload);
  }

  return (
    <Switch
      disabled={isLoading}
      onCheckedChange={onCheckedHandler}
      checked={props?.row?.mapped_remote_product?.sync_inventory}
    />
  );
}

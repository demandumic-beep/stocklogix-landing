import type { Block, BlockType } from "./types";
import { hero } from "./blocks/hero/hero";
import { features } from "./blocks/features/features";
import { stats } from "./blocks/stats/stats";
import { products } from "./blocks/products/products";
import { roles } from "./blocks/roles/roles";
import { text } from "./blocks/text/text";
import { cta } from "./blocks/cta/cta";
import { contacts } from "./blocks/contacts/contacts";

// Щоб додати новий блок: тип у types.ts → файл блоку → рядок тут → блок у cms/src/blocks.
const renderers: { [K in BlockType]: (block: Extract<Block, { type: K }>) => string } = {
  hero,
  text,
  cta,
  features,
  stats,
  products,
  roles,
  contacts,
};

export function renderBlocks(blocks: Block[]): string {
  return blocks
    .map((block) => {
      const render = renderers[block.type] as ((b: Block) => string) | undefined;

      if (!render) {
        console.warn(`Блок "${block.type}" не підтримується`);
        return "";
      }

      return render(block);
    })
    .join("");
}

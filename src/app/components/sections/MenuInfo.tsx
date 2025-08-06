import { Dictionary } from "@/app/[lang]/types";
import { Card, CardContainer, CardTitle } from "../Card";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";

export const MenuInfo = ({ dict }: { dict: Dictionary }) => {
  // Helper function to add emojis and bold formatting to menu items
  const formatMenuItem = (text: string, type: 'soup' | 'main' | 'dessert') => {
    if (type === 'soup') {
      if (text.toLowerCase().includes('salmon') || text.toLowerCase().includes('lachs') || text.toLowerCase().includes('lohi')) {
        return `🐟 ${text}`;
      } else if (text.toLowerCase().includes('vegetable') || text.toLowerCase().includes('gemüse') || text.toLowerCase().includes('kasvis')) {
        return `🥬 ${text}`;
      }
    } else if (type === 'main') {
      if (text.toLowerCase().includes('ox') || text.toLowerCase().includes('ochsen') || text.toLowerCase().includes('häränposkea')) {
        const boldText = text.replace(/(ox cheeks|ochsenbacken|häränposkea)/gi, '**$1**');
        return `🐮 ${boldText}`;
      } else if (text.toLowerCase().includes('saiblingsfilet') || text.toLowerCase().includes('trout filet') || text.toLowerCase().includes('nieriäfilee')) {
        const boldText = text.replace(/(saiblingsfilet|trout filet|nieriäfilee)/gi, '**$1**');
        return `🐟 ${boldText}`;
      } else if (text.toLowerCase().includes('schlutzkrapfen') || text.toLowerCase().includes('ravioli') || text.toLowerCase().includes('pastataskut')) {
        const boldText = text.replace(/(schlutzkrapfen|ravioli|pastataskut)/gi, '**$1**');
        return `🥬 ${boldText}`;
      }
    }
    return text;
  };

  const menuSections = [
    {
      title: dict.menu.vorspeise.title,
      items: [
        formatMenuItem(dict.menu.vorspeise.finnish_salmon_soup, 'soup'),
        formatMenuItem(dict.menu.vorspeise.vegetarian_soup, 'soup'),
      ],
      type: 'soup' as const,
    },
    {
      title: dict.menu.hauptspeise.title,
      items: [
        formatMenuItem(dict.menu.hauptspeise.braised_beef, 'main'),
        formatMenuItem(dict.menu.hauptspeise.saibling_filet, 'main'),
        formatMenuItem(dict.menu.hauptspeise.stuffed_schlutzkrapfen, 'main'),
      ],
      type: 'main' as const,
    },
    {
      title: dict.menu.dessert.title,
      items: [
        dict.menu.dessert.kaiserschmarrn,
        dict.menu.dessert.tiramisu,
        dict.menu.dessert.chocolate_mousse,
      ],
      type: 'dessert' as const,
    },
  ];

  return (
    <SectionContainer id="menu-info" bgColor="#F5E6D3" bgImage="/menu.webp">
      <SectionTitle value={dict.menu.title} color="white" />
      <CardContainer cols={3}>
        {menuSections.map((section, index) => (
          <Card key={index}>
            <CardTitle value={section.title} />
            <div className="text-left space-y-3">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="text-[#4A4238] max-sm:text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }}
                />
              ))}
            </div>
          </Card>
        ))}
      </CardContainer>
    </SectionContainer>
  );
};
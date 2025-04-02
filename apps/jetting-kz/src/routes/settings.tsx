import { createFileRoute } from '@tanstack/react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Button,
  Checkbox,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  Slider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';
import {
  airScrewPositions,
  emulsionTubeTypes,
  engineType,
  floats,
  fuelType, iddleDiffuser,
  iddleDiffusers,
  iddleJets,
  sparkles,
  trackTypes
} from '../types';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

export const Route = createFileRoute('/settings')({
  component: SettingsComponent,
});

const formSchema = z.object({
  engineType: z.enum(engineType),
  emulsionTubeType: z.enum(emulsionTubeTypes),
  oilMixPercent: z.number(),
  trackType: z.enum(trackTypes),
  sparkle: z.enum(sparkles),
  floats: z.enum(floats),
  fuelType: z.enum(fuelType),
  floatHeight: z.number(),
  needleSemiStep: z.boolean(),
});

export function SettingsComponent() {
  const intl = useIntl();
  const form = useForm({
    defaultValues: {
      engineType: 'KZ_R1',
      emulsionTubeType: 'DP',
      oilMixPercent: 4,
      trackType: 'SPRINT_MEDIUM',
      sparkle: 'NGK_EG',
      floats: 'FLOAT2X28GR',
      fuelType: 'AKI_91',
      floatHeight: 2,
      needleSemiStep: false,
    },
    validators: { onChange: formSchema },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <div className="container m-auto ">
      <h1>
        <FormattedMessage id="settings.title" defaultMessage="Settings" />
      </h1>
      <form>
        <div className="grid lg:grid-cols-4 gap-4">
          {/* ---- L1 ----- */}
          <h2>
            <FormattedMessage id="settings.engine" defaultMessage="Engine" />
          </h2>
          <h2>
            <FormattedMessage
              id="settings.carburator"
              defaultMessage="Carburator"
            />
          </h2>
          <h2>
            <FormattedMessage id="settings.fuel" defaultMessage="Fuel" />
          </h2>
          <h2>
            <FormattedMessage id="settings.track" defaultMessage="Track" />
          </h2>

          {/* ---- L2 ----- */}
          <form.Field
            name="engineType"
            children={() => (
              <Select
                placeholder={intl.formatMessage({
                  id: 'settings.engine.type.placeholder',
                  defaultMessage: 'Selectionnez un type',
                })}
              >
                <Label>
                  <FormattedMessage
                    id="settings.engine.type"
                    defaultMessage="Type"
                  />
                </Label>
                <Button>
                  <SelectValue />
                  <span aria-hidden="true">▼</span>
                </Button>
                <Popover>
                  <ListBox
                    items={engineType.map((type) => ({
                      label: type.replace('_', ' '),
                      value: type,
                    }))}
                  >
                    {(item) => (
                      <ListBoxItem id={item.value}>{item.label}</ListBoxItem>
                    )}
                  </ListBox>
                </Popover>
              </Select>
            )}
          />
          <form.Field
            name="emulsionTubeType"
            children={() => (
              <Select
                placeholder={intl.formatMessage({
                  id: 'settings.engine.emulsionType.placholder',
                  defaultMessage: "Selectionnez un type d'émulsion",
                })}
              >
                <Label>
                  <FormattedMessage
                    id="settings.engine.emulsionType"
                    defaultMessage="Type d'émulsion"
                  />
                </Label>
                <Button>
                  <SelectValue />
                  <span aria-hidden="true">▼</span>
                </Button>
                <Popover>
                  <ListBox
                    items={emulsionTubeTypes.map((type) => ({
                      label: type,
                      value: type,
                    }))}
                  >
                    {(item) => (
                      <ListBoxItem id={item.value}>{item.label}</ListBoxItem>
                    )}
                  </ListBox>
                </Popover>
              </Select>
            )}
          />
          <form.Field
            name="oilMixPercent"
            children={() => (
              <Slider defaultValue={4}>
                <Label>
                  <FormattedMessage
                    id="settings.carburator.fuelOilPercent"
                    defaultMessage="Fuel/Oil"
                  />
                </Label>
                <SliderOutput />%
                <SliderTrack>
                  <SliderThumb />
                </SliderTrack>
              </Slider>
            )}
          />

          <form.Field
            name="trackType"
            children={() => (
              <Select
                placeholder={intl.formatMessage({
                  id: 'settings.track.type.placeholder',
                  defaultMessage: 'Selectionnez un type',
                })}
              >
                <Label>
                  <FormattedMessage
                    id="settings.track.type"
                    defaultMessage="Type"
                  />
                </Label>
                <Button>
                  <SelectValue />
                </Button>
                <Popover>
                  <ListBox>
                    <ListBoxItem id="SPRINT_MEDIUM">
                      <FormattedMessage
                        id="settings.track.type.sprintMedium"
                        defaultMessage="Sprint medium"
                      />
                    </ListBoxItem>
                    <ListBoxItem id="SPRINT_LONG_STRAIGHT">
                      <FormattedMessage
                        id="settings.track.type.sprintLongStraight"
                        defaultMessage="Sprint long straight"
                      />
                    </ListBoxItem>
                    <ListBoxItem id="SPRINT_SHORT_STRAIGHT">
                      <FormattedMessage
                        id="settings.track.type.sprintShortStraight"
                        defaultMessage="Sprint short straight"
                      />
                    </ListBoxItem>
                  </ListBox>
                </Popover>
              </Select>
            )}
          />
          {/* ---- L3 ----- */}
          <form.Field
            name="sparkle"
            children={() => (
              <Select
                placeholder={intl.formatMessage({
                  id: 'settings.engine.sparkle.placeholder',
                  defaultMessage: 'Select a sparkle',
                })}
              >
                <Label>
                  <FormattedMessage
                    id="settings.engine.sparkle"
                    defaultMessage="Sparkle"
                  />
                </Label>
                <Button>
                  <SelectValue />
                  <span aria-hidden="true">▼</span>
                </Button>
                <Popover>
                  <ListBox
                    items={sparkles.map((type) => ({
                      label: type.replace('_', ' '),
                      value: type,
                    }))}
                  >
                    {(item) => (
                      <ListBoxItem id={item.value}>{item.label}</ListBoxItem>
                    )}
                  </ListBox>
                </Popover>
              </Select>
            )}
          />
          <form.Field
            name="floats"
            children={() => (
              <Select
                placeholder={intl.formatMessage({
                  id: 'settings.carburator.float.placeholder',
                  defaultMessage: 'Select a float',
                })}
              >
                <Label>
                  <FormattedMessage
                    id="settings.carburator.float"
                    defaultMessage="Float"
                  />
                </Label>
                <Button>
                  <SelectValue />
                  <span aria-hidden="true">▼</span>
                </Button>
                <Popover>
                  <ListBox>
                    <ListBoxItem id="FLOAT1X40GR">1 x 4.0 gr</ListBoxItem>
                    <ListBoxItem id="FLOAT2X28GR">2 x 2.8 gr</ListBoxItem>
                    <ListBoxItem id="FLOAT2X35GR">2 x 3.5 gr</ListBoxItem>
                    <ListBoxItem id="FLOAT2X36GR">2 x 3.6 gr</ListBoxItem>
                    <ListBoxItem id="FLOAT2X4GR">2 x 4.0 gr</ListBoxItem>
                    <ListBoxItem id="FLOAT2X45GR">2 x 4.5 gr</ListBoxItem>
                    <ListBoxItem id="FLOAT2X52GR">2 x 5.2 gr</ListBoxItem>
                    <ListBoxItem id="FLOAT1X9GR">1 x 9.0 gr</ListBoxItem>
                  </ListBox>
                </Popover>
              </Select>
            )}
          />
          <form.Field
            name="fuelType"
            children={() => (
              <Select
                className="col-end-4"
                placeholder={intl.formatMessage({
                  id: 'settings.fuel.type.placeholder',
                  defaultMessage: 'Select a type',
                })}
              >
                <Label>
                  <FormattedMessage
                    id="settings.fuel.type"
                    defaultMessage="Fuel type"
                  />
                </Label>
                <Button>
                  <SelectValue />
                  <span aria-hidden="true">▼</span>
                </Button>
                <Popover>
                  <ListBox>
                    <ListBoxItem id="AKI_91">91 AKI (USA)</ListBoxItem>
                    <ListBoxItem id="AKI_93">93 AKI (USA)</ListBoxItem>
                    <ListBoxItem id="RON_95">95 RON (Euro)</ListBoxItem>
                    <ListBoxItem id="RON_98">98 RON (Euro)</ListBoxItem>
                    <ListBoxItem id="VP_C12">VP RACING C12</ListBoxItem>
                    <ListBoxItem id="VP_110">VP RACING 110</ListBoxItem>
                    <ListBoxItem id="VP_MRX02">VP RACING MRX02</ListBoxItem>
                    <ListBoxItem id="AKI_91_ETHANOL">
                      91 AKI (USA) - 5-10% ETHANOL
                    </ListBoxItem>
                    <ListBoxItem id="AKI_93_ETHANOL">
                      93 AKI (USA) - 5-10% ETHANOL
                    </ListBoxItem>
                    <ListBoxItem id="VP_RACING_MS93">
                      VP RACING MS93
                    </ListBoxItem>
                  </ListBox>
                </Popover>
              </Select>
            )}
          />

          {/* ---- L4 ----- */}
          <form.Field
            name="floatHeight"
            children={() => (
              <Select
                className="col-start-2 col-end-3"
                placeholder={intl.formatMessage({
                  id: 'settings.carburator.floatHeight.placeholder',
                  defaultMessage: 'Select a float height',
                })}
              >
                <Label>
                  <FormattedMessage
                    id="settings.carburator.floatHeight"
                    defaultMessage="Float height"
                  />
                </Label>
                <Button>
                  <SelectValue />
                  <span aria-hidden="true">▼</span>
                </Button>
                <Popover>
                  <ListBox
                    items={Array(20)
                      .fill(0)
                      .map((_, i) => ({ name: i + 1, value: i + 1 }))}
                  >
                    {(item) => (
                      <ListBoxItem id={item.value}>{item.name} mm</ListBoxItem>
                    )}
                  </ListBox>
                </Popover>
              </Select>
            )}
          />

          {/* ---- L5 ----- */}
          <form.Field
            name="needleSemiStep"
            children={() => (
              <Checkbox className="col-start-2 col-end-3">
                {({ isIndeterminate }) => (
                  <>
                    <div className="checkbox">
                      <svg viewBox="0 0 18 18" aria-hidden="true">
                        {isIndeterminate ? (
                          <rect x={1} y={7.5} width={15} height={3} />
                        ) : (
                          <polyline points="1 9 7 14 15 4" />
                        )}
                      </svg>
                    </div>
                    <FormattedMessage
                      id="settings.carburator.needleSemiStep"
                      defaultMessage="Needle semi-step"
                    />
                  </>
                )}
              </Checkbox>
            )}
          />
        </div>
      </form>
    </div>
  );
}

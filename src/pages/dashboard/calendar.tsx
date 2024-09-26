import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import type { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import type { EventResizeDoneArg } from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import type { Theme } from '@mui/material';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useDialog } from '../../hooks/use-dialog';
import { usePageView } from '../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../layouts/dashboard';
import { paths } from '../../paths';
import { CalendarContainer } from '../../sections/dashboard/calendar/calendar-container';
import { CalendarEventDialog } from '../../sections/dashboard/calendar/calendar-event-dialog';
import { CalendarToolbar } from '../../sections/dashboard/calendar/calendar-toolbar';
import { useDispatch, useSelector } from '../../store';
import { thunks } from '../../thunks/calendar';
import type { CalendarEvent, CalendarView } from '../../types/calendar';

interface CreateDialogData {
  range?: {
    start: number;
    end: number;
  };
}

interface UpdateDialogData {
  eventId?: string;
}

const useEvents = (): CalendarEvent[] => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.calendar.events);

  const getEvents = useCallback(
    (): void => {
      dispatch(thunks.getEvents());
    },
    [dispatch]
  );

  useEffect(
    () => {
      getEvents();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return events;
};

const useCurrentEvent = (
  events: CalendarEvent[],
  dialogData?: UpdateDialogData
): CalendarEvent | undefined => {
  return useMemo(
    (): CalendarEvent | undefined => {
      if (!dialogData) {
        return undefined;
      }

      return events.find((event) => event.id === dialogData!.eventId);
    },
    [dialogData, events]
  );
};

const Page: NextPage = () => {
  const dispatch = useDispatch();
  const calendarRef = useRef<Calendar | null>(null);
  const events = useEvents();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>(mdUp ? 'timeGridDay' : 'dayGridMonth');
  const createDialog = useDialog<CreateDialogData>();
  const updateDialog = useDialog<UpdateDialogData>();
  const updatingEvent = useCurrentEvent(events, updateDialog.data);

  usePageView();

  const handleScreenResize = useCallback(
    (): void => {
      const calendarEl = calendarRef.current;

      if (calendarEl) {
        const calendarApi = calendarEl.getApi();
        const newView = mdUp ? 'dayGridMonth' : 'timeGridDay';

        calendarApi.changeView(newView);
        setView(newView);
      }
    },
    [calendarRef, mdUp]
  );

  useEffect(
    () => {
      handleScreenResize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mdUp]
  );

  const handleViewChange = useCallback(
    (view: CalendarView): void => {
      const calendarEl = calendarRef.current;

      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.changeView(view);
        setView(view);
      }
    },
    []
  );

  const handleDateToday = useCallback(
    (): void => {
      const calendarEl = calendarRef.current;

      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.today();
        setDate(calendarApi.getDate());
      }
    },
    []
  );

  const handleDatePrev = useCallback(
    (): void => {
      const calendarEl = calendarRef.current;

      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.prev();
        setDate(calendarApi.getDate());
      }
    },
    []
  );

  const handleDateNext = useCallback(
    (): void => {
      const calendarEl = calendarRef.current;

      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.next();
        setDate(calendarApi.getDate());
      }
    },
    []
  );

  const handleAddClick = useCallback(
    (): void => {
      createDialog.handleOpen();
    },
    [createDialog]
  );

  const handleRangeSelect = useCallback(
    (arg: DateSelectArg): void => {
      const calendarEl = calendarRef.current;

      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.unselect();
      }

      createDialog.handleOpen({
        range: {
          start: arg.start.getTime(),
          end: arg.end.getTime()
        }
      });
    },
    [createDialog]
  );

  const handleEventSelect = useCallback(
    (arg: EventClickArg): void => {
      updateDialog.handleOpen({
        eventId: arg.event.id
      });
    },
    [updateDialog]
  );

  const handleEventResize = useCallback(
    async (arg: EventResizeDoneArg): Promise<void> => {
      const { event } = arg;

      try {
        await dispatch(thunks.updateEvent({
          eventId: event.id,
          update: {
            allDay: event.allDay,
            start: event.start?.getTime(),
            end: event.end?.getTime()
          }
        }));
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  const handleEventDrop = useCallback(
    async (arg: EventDropArg): Promise<void> => {
      const { event } = arg;

      try {
        await dispatch(thunks.updateEvent({
          eventId: event.id,
          update: {
            allDay: event.allDay,
            start: event.start?.getTime(),
            end: event.end?.getTime()
          }
        }));
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  return (
    <>
      <Head>
        <title>
          Dashboard: Calendar | Carpatin
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography variant="h5">
                  Here&apos;s what you planned
                </Typography>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator={(
                    <SvgIcon fontSize="small">
                      <ChevronRightIcon />
                    </SvgIcon>
                  )}
                >
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                  >
                    Dashboard
                  </Link>
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                  >
                    Calendar
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <div>
                <Button
                  onClick={handleAddClick}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  New Event
                </Button>
              </div>
            </Stack>
            <CalendarToolbar
              date={date}
              onAddClick={handleAddClick}
              onDateNext={handleDateNext}
              onDatePrev={handleDatePrev}
              onDateToday={handleDateToday}
              onViewChange={handleViewChange}
              view={view}
            />
            <Card sx={{ p: 2 }}>
              <CalendarContainer>
                <Calendar
                  allDayMaintainDuration
                  dayMaxEventRows={3}
                  droppable
                  editable
                  eventClick={handleEventSelect}
                  eventDisplay="block"
                  eventDrop={handleEventDrop}
                  eventResizableFromStart
                  eventResize={handleEventResize}
                  events={events}
                  headerToolbar={false}
                  height={800}
                  initialDate={date}
                  initialView={view}
                  plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    listPlugin,
                    timeGridPlugin,
                    timelinePlugin
                  ]}
                  ref={calendarRef}
                  rerenderDelay={10}
                  select={handleRangeSelect}
                  selectable
                  weekends
                />
              </CalendarContainer>
            </Card>
          </Stack>
        </Container>
      </Box>
      <CalendarEventDialog
        action="create"
        onAddComplete={createDialog.handleClose}
        onClose={createDialog.handleClose}
        open={createDialog.open}
        range={createDialog.data?.range}
      />
      <CalendarEventDialog
        action="update"
        event={updatingEvent}
        onClose={updateDialog.handleClose}
        onDeleteComplete={updateDialog.handleClose}
        onEditComplete={updateDialog.handleClose}
        open={updateDialog.open}
      />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

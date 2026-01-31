import moment from 'moment';

const getLastMessageDate = (lastMessage: any) => {
    if (!lastMessage?.createdAt) return null;

    const messageDate = moment(lastMessage.createdAt);
    const today = moment();

    if (messageDate.isSame(today, "day")) {
        return messageDate.format("h:mm A");
    }

    if (messageDate.isSame(today, "year")) {
        return messageDate.format("MMM D");
    }

    return messageDate.format("MMM D, YYYY");
};

export { getLastMessageDate };

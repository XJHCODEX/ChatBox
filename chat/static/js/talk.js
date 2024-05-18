Talk.ready.then(() => {
    const me = new Talk.User({
      id: '{{ user.id }}',
      name: '{{ user.name }}',
      welcomeMessage: '{{ user.welcomeMessage }}',
    });

    const other = new Talk.User({
      id: '{{ other.id }}',
      name: '{{ other.name }}',
      email: '{{ other.email }}',
      photoUrl: '{{ other.photoUrl }}',
      welcomeMessage: '{{ other.welcomeMessage }}',
    });

    const session = new Talk.Session({
      appId: '{{ app_id }}',
      me: me,
    });

    const conversation = session.getOrCreateConversation(
      '{{ conversation_id }}'
    );
    conversation.setParticipant(me);
    conversation.setParticipant(other);

    const inbox = session.createInbox();
    inbox.select(conversation);
    inbox.mount(document.getElementById('talkjs-container'));
  });